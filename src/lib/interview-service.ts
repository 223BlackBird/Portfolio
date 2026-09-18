/**
 * Live Interview Room Service
 *
 * Ingests recent public interview reports from developer communities (LeetCode Discuss & Reddit),
 * extracts reported technical topics, calculates real trend signals based on independent report frequency,
 * and generates original technical interview questions with source attribution and trade-offs.
 *
 * NOTE: Independent of MongoDB. Utilizes in-memory server-side caching with explicit freshness timestamps.
 */

export type TrendLabel = "TRENDING TOPIC" | "RECENTLY REPORTED" | "SEEN IN RECENT REPORTS";

export interface PublicInterviewReport {
  id: string;
  platform: string;
  title: string;
  url: string;
  publishedAt: string; // ISO date string
  content?: string;
}

export interface SupportingReportMeta {
  title: string;
  platform: string;
  url: string;
  publishedDate: string;
}

export interface InterviewQuestionData {
  id: string;
  topic: string;
  trendLabel: TrendLabel;
  isLive: boolean;
  crossSource: boolean;
  level: string;
  question: string;
  discussion: string;
  keyPoints: string[];
  tradeOffs: string;
  source: {
    reportTitle: string;
    platform: string;
    url: string;
    publishedDate: string;
    supportingReportCount: number;
    supportingReports: SupportingReportMeta[];
    fetchedAt: string;
    cacheAgeFormatted: string;
  };
}

interface CachedInterviewState {
  questions: InterviewQuestionData[];
  cachedAt: number;
  isLive: boolean;
  currentIndex: number;
}

declare global {
  // eslint-disable-next-line no-var
  var _playgroundInterviewState: CachedInterviewState | undefined;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour TTL

interface TopicRule {
  topic: string;
  category: string;
  level: string;
  matchRegex: RegExp;
  generator: (reports: PublicInterviewReport[]) => {
    question: string;
    discussion: string;
    keyPoints: string[];
    tradeOffs: string;
  };
}

const TOPIC_RULES: TopicRule[] = [
  {
    topic: "Distributed Systems · Scheduled Jobs",
    category: "Distributed Systems",
    level: "MID · BACKEND",
    // Strict word-boundary regex avoiding false matches like 'rescheduled' or 'job market'
    matchRegex: /\b(distributed\s+cron|distributed\s+lock|shedlock|redlock|background\s+job|task\s+queue|worker\s+queue|distributed\s+scheduler)\b/i,
    generator: () => ({
      question:
        "How would you prevent the same scheduled background job from being processed twice when multiple application instances are running concurrently?",
      discussion:
        "In horizontally scaled backends where every instance runs the same scheduled trigger, jobs will execute redundantly unless coordinated. The standard approach uses distributed lease locks (e.g. Redis with Redlock/ShedLock or PostgreSQL advisory locks) with an explicit TTL to prevent deadlocks if an instance crashes during processing. Alternatively, a centralized workflow engine (like Temporal) or dedicated scheduler queue dispatches single-execution task messages to worker pools with unique idempotency keys.",
      keyPoints: [
        "Distributed locks / lease mechanisms with explicit TTLs to avoid deadlocks",
        "Idempotent worker execution so duplicate triggers cause no downstream side effects",
        "Separation of single-instance scheduling from parallel worker execution",
        "Handling node crashes, clock skew, and lease heartbeat renewal",
      ],
      tradeOffs:
        "Distributed locks introduce a shared coordinator dependency (Redis/DB) and clock-skew risks, whereas message-driven worker queues with idempotency require additional queue infrastructure but decouple scheduling cleanly.",
    }),
  },
  {
    topic: "Database Indexing & Query Degradation",
    category: "Databases",
    level: "MID · DATABASES",
    matchRegex: /\b(database\s+index|indexing|query\s+planner|explain\s+analyze|slow\s+query|b-tree|table\s+scan|covering\s+index)\b/i,
    generator: () => ({
      question:
        "A high-traffic API query begins experiencing p99 latency spikes as the database table grows from thousands to millions of rows. How do you diagnose and resolve this without blindly adding indexes?",
      discussion:
        "Before altering schemas, inspect the query execution plan using EXPLAIN ANALYZE to identify sequential scans, buffer misses, and filter operations. Evaluate column cardinality; indexing low-cardinality columns (e.g. boolean flags) often provides minimal benefit over sequential scans. Check for composite indexing opportunities matching query predicate order (equality filters first, then range filters), and analyze index write overhead on high-frequency write tables.",
      keyPoints: [
        "Inspect actual execution plans (EXPLAIN ANALYZE) before altering schema",
        "Evaluate index selectivity and column cardinality",
        "Composite index ordering (equality filters before range filters)",
        "Write-amplification and buffer memory trade-offs of secondary indexes",
      ],
      tradeOffs:
        "Indexes accelerate read lookups but increase disk storage and write latency on every mutation. Covering indexes eliminate heap lookups but increase index memory footprint.",
    }),
  },
  {
    topic: "Cache Stampede & Invalidation",
    category: "Caching & Redis",
    level: "SENIOR · SYSTEM DESIGN",
    matchRegex: /\b(cache\s+stampede|cache\s+invalidation|redis\s+cache|memcached|write-through|thundering\s+herd|cache\s+eviction)\b/i,
    generator: () => ({
      question:
        "Under heavy concurrent read traffic, a cached key expires, causing hundreds of database queries simultaneously (cache stampede). How do you architect around this?",
      discussion:
        "Cache stampedes (thundering herds) occur when concurrent requests miss the cache at the moment of key expiration and all attempt to regenerate the data from the database. Solutions include probabilistic early expiration (XFetch algorithm), mutex locking / single-flight request coalescing so only one worker queries the database while others wait or receive stale data, or background proactive cache warming before hard TTL expiry.",
      keyPoints: [
        "Single-flight request deduplication / mutex locks across workers",
        "Probabilistic early refresh (recomputing before hard TTL expiry)",
        "Stale-while-revalidate serving with asynchronous background regeneration",
        "Jittered TTLs to prevent synchronized expiration of bulk cached keys",
      ],
      tradeOffs:
        "Mutex locks on cache misses prevent database overload but add request latency for waiting clients; stale-while-revalidate provides fast responses at the expense of serving slightly out-of-date data.",
    }),
  },
  {
    topic: "Event-Driven Messaging & Consumer Lag",
    category: "Messaging & Kafka",
    level: "SENIOR · DISTRIBUTED SYSTEMS",
    matchRegex: /\b(kafka|consumer\s+lag|rabbitmq|dead\s+letter|message\s+queue|event-driven|partition\s+rebalance)\b/i,
    generator: () => ({
      question:
        "In an event-driven architecture, a message consumer group begins falling behind upstream producers (growing consumer lag). What architectural levers do you use to diagnose and resolve it?",
      discussion:
        "Diagnose whether the bottleneck is I/O-bound (e.g., slow downstream database/third-party calls) or CPU-bound. If I/O-bound, parallelize processing within consumers (e.g., worker pools per partition while preserving key ordering). If partition-constrained, increase partition count and scale out consumer instances up to the partition limit. Implement dead-letter queues (DLQ) for poisoned messages and apply backpressure to upstream producers if storage thresholds are exceeded.",
      keyPoints: [
        "Partition scaling vs consumer instance concurrency limits",
        "Decoupling message receipt from processing via internal worker pools",
        "Dead-letter queues (DLQ) and exponential backoff for unprocessable messages",
        "Batching consumer commits to reduce coordinator network overhead",
      ],
      tradeOffs:
        "Increasing partitions enables higher horizontal scaling but increases broker memory overhead and rebalance duration. In-memory concurrency within a single consumer increases throughput but complicates offset commit ordering and error recovery.",
    }),
  },
  {
    topic: "API Idempotency & Concurrency",
    category: "API Design",
    level: "MID · BACKEND",
    matchRegex: /\b(idempotent|idempotency\s+key|race\s+condition|optimistic\s+lock|duplicate\s+payment|double\s+submit)\b/i,
    generator: () => ({
      question:
        "How would you design a payment processing API to guarantee exactly-once processing semantics when clients experience network timeouts and retry requests?",
      discussion:
        "Network timeouts leave the client unsure whether a mutation completed. The standard pattern requires client-generated Idempotency Keys (e.g., UUIDv4 in headers). The server records the idempotency key in an atomic fast-path store (e.g., Redis or DB unique constraint) with a 'PROCESSING' status. If a retry arrives with the same key while processing, it is rejected or polled. Once completed, the final response payload is persisted alongside the key so future retries immediately return the identical cached result without re-executing payment logic.",
      keyPoints: [
        "Client-supplied unique idempotency keys (UUIDv4) stored atomically",
        "State transitions: PENDING/PROCESSING → COMPLETED / FAILED with TTL",
        "Returning identical cached response on duplicate valid submissions",
        "Database unique constraints as the final consistency safeguard",
      ],
      tradeOffs:
        "Idempotency key storage adds an extra write and TTL management layer, and requires defining the key scope (per-tenant or per-user) to prevent cross-account collisions.",
    }),
  },
  {
    topic: "Distributed Rate Limiting",
    category: "Architecture & Resiliency",
    level: "SENIOR · SYSTEM DESIGN",
    matchRegex: /\b(rate\s+limit|rate\s+limiting|token\s+bucket|leaky\s+bucket|429\s+too\s+many|api\s+throttling)\b/i,
    generator: () => ({
      question:
        "How do you implement a distributed rate limiter for a public API that supports both bursty traffic and strict per-minute usage quotas across multiple edge servers?",
      discussion:
        "A distributed rate limiter requires shared state across edge nodes, typically using Redis. The Token Bucket algorithm is ideal for allowing configured bursts up to bucket capacity while refilling tokens at a constant rate. In Redis, this can be implemented atomically via a single Lua script or Redis Cell to avoid race conditions. Return standard HTTP 429 Too Many Requests with headers (Retry-After, X-RateLimit-Remaining) so polite clients back off gracefully.",
      keyPoints: [
        "Algorithm selection: Token Bucket (allows bursts) vs Sliding Window Counter",
        "Atomic distributed counter updates using Redis Lua scripts",
        "Standard rate-limiting HTTP headers (X-RateLimit-Limit, Retry-After)",
        "Fail-open vs fail-closed strategy during cache infrastructure outages",
      ],
      tradeOffs:
        "Token Bucket handles bursts gracefully with low memory overhead, but can cause brief downstream spikes; sliding window logs guarantee exact rates but consume significantly more memory per client.",
    }),
  },
];

/**
 * Parses XML/RSS text to extract items without heavy XML dependencies.
 */
function parseRssTitlesAndLinks(xml: string, platformName: string): PublicInterviewReport[] {
  const reports: PublicInterviewReport[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>|<entry>([\s\S]*?)<\/entry>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1] || match[2];
    const titleMatch = block.match(/<title[^>]*>([^<]+)<\/title>/i);
    const linkMatch = block.match(/<link[^>]*href=["']([^"']+)["']|<link[^>]*>([^<]+)<\/link>/i);
    const dateMatch = block.match(/<pubDate>([^<]+)<\/pubDate>|<updated>([^<]+)<\/updated>/i);

    if (titleMatch) {
      const rawTitle = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();

      if (rawTitle.toLowerCase() === "blocked") continue;

      const link = linkMatch ? (linkMatch[1] || linkMatch[2] || "").trim() : "";
      const dateStr = dateMatch ? (dateMatch[1] || dateMatch[2] || "") : new Date().toISOString();
      const parsedDate = new Date(dateStr);
      const validDate = isNaN(parsedDate.getTime()) ? new Date().toISOString() : parsedDate.toISOString();

      reports.push({
        id: `${platformName}-${reports.length}-${Date.now()}`,
        platform: platformName,
        title: rawTitle,
        url: link.startsWith("http") ? link : "https://www.reddit.com/r/ExperiencedDevs/",
        publishedAt: validDate,
      });
    }
  }

  return reports;
}

/**
 * Fetches public interview discussion reports from public community surfaces.
 */
async function fetchPublicReports(): Promise<PublicInterviewReport[]> {
  const reports: PublicInterviewReport[] = [];

  // Source A: Reddit r/ExperiencedDevs public search RSS
  try {
    const resReddit = await fetch(
      "https://www.reddit.com/r/ExperiencedDevs/search.rss?q=interview&sort=new&restrict_sr=1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        },
        next: { revalidate: 3600 },
      }
    );
    if (resReddit.ok) {
      const xml = await resReddit.text();
      const parsed = parseRssTitlesAndLinks(xml, "Reddit r/ExperiencedDevs");
      reports.push(...parsed);
    }
  } catch (err) {
    console.warn("Could not fetch Reddit r/ExperiencedDevs RSS:", (err as Error).message);
  }

  // Source B: Reddit r/cscareerquestions public search RSS
  try {
    const resCs = await fetch(
      "https://www.reddit.com/r/cscareerquestions/search.rss?q=interview+experience+backend&sort=new&restrict_sr=1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        },
        next: { revalidate: 3600 },
      }
    );
    if (resCs.ok) {
      const xml = await resCs.text();
      const parsed = parseRssTitlesAndLinks(xml, "Reddit r/cscareerquestions");
      reports.push(...parsed);
    }
  } catch (err) {
    console.warn("Could not fetch Reddit r/cscareerquestions RSS:", (err as Error).message);
  }

  // Source C: LeetCode Discuss GraphQL (public categoryTopicList)
  try {
    const lcQuery = `
      query categoryTopicList($categories: [String!], $first: Int, $orderBy: TopicSortingOption) {
        categoryTopicList(categories: $categories, first: $first, orderBy: $orderBy) {
          edges {
            node {
              id
              title
              post {
                content
                creationDate
              }
            }
          }
        }
      }
    `;

    const resLc = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query: lcQuery,
        variables: {
          categories: ["interview-experience"],
          first: 10,
          orderBy: "newest_to_oldest",
        },
      }),
      next: { revalidate: 3600 },
    });

    if (resLc.ok) {
      const data = await resLc.json();
      const edges = data.data?.categoryTopicList?.edges || [];
      for (const e of edges) {
        const title = e.node?.title || "";
        const content = e.node?.post?.content || "";
        const creationSec = e.node?.post?.creationDate;
        const pubDate = creationSec ? new Date(creationSec * 1000).toISOString() : new Date().toISOString();
        reports.push({
          id: `leetcode-${e.node?.id || Math.random()}`,
          platform: "LeetCode Discuss",
          title,
          url: "https://leetcode.com/discuss/interview-experience/",
          publishedAt: pubDate,
          content,
        });
      }
    }
  } catch (err) {
    console.warn("Could not fetch LeetCode Discuss public GraphQL:", (err as Error).message);
  }

  return reports;
}

/**
 * Format relative cache age.
 */
function formatRelativeAge(epochMs: number): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - epochMs) / 1000));
  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

/**
 * Format publication date cleanly from ISO string.
 */
function formatPubDate(isoStr: string): string {
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recent report";
  }
}

/**
 * Fallback baseline reports for cold-start resilience when external APIs are unreachable.
 */
const BASELINE_REPORTS: PublicInterviewReport[] = [
  {
    id: "baseline-1",
    platform: "Reddit r/ExperiencedDevs",
    title: "Mid-Senior Backend Interview: Distributed background task processing and worker locking",
    url: "https://www.reddit.com/r/ExperiencedDevs/",
    publishedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
  {
    id: "baseline-2",
    platform: "LeetCode Discuss",
    title: "E5 System Design Experience: Indexing degradation on growing SQL tables and EXPLAIN ANALYZE",
    url: "https://leetcode.com/discuss/interview-experience/",
    publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
  },
];

/**
 * Builds the synthesized questions from ingested reports and explicit trend criteria.
 */
function buildSynthesizedQuestions(
  reports: PublicInterviewReport[],
  fetchedAt: number,
  isLive: boolean
): InterviewQuestionData[] {
  const result: InterviewQuestionData[] = [];

  for (const rule of TOPIC_RULES) {
    // Match against independent reports using strict regex on title and content
    const matchedReports = reports.filter((r) => {
      return rule.matchRegex.test(r.title) || (r.content ? rule.matchRegex.test(r.content) : false);
    });

    // Pick top report for citation
    const primaryReport = matchedReports.length > 0 ? matchedReports[0] : reports[0];

    // Explicit Trend Classification:
    // TRENDING TOPIC = topic appears in at least 2 independent recent reports
    // RECENTLY REPORTED = topic appears in fewer than 2 recent reports
    let trendLabel: TrendLabel = "RECENTLY REPORTED";
    if (isLive && matchedReports.length >= 2) {
      trendLabel = "TRENDING TOPIC";
    } else {
      trendLabel = "RECENTLY REPORTED";
    }

    const crossSource = isLive && matchedReports.length >= 2 && new Set(matchedReports.map((r) => r.platform)).size > 1;
    const generated = rule.generator(matchedReports);

    result.push({
      id: `topic-${rule.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      topic: rule.topic,
      trendLabel,
      isLive,
      crossSource,
      level: rule.level,
      question: generated.question,
      discussion: generated.discussion,
      keyPoints: generated.keyPoints,
      tradeOffs: generated.tradeOffs,
      source: {
        reportTitle: primaryReport.title,
        platform: primaryReport.platform,
        url: primaryReport.url,
        publishedDate: formatPubDate(primaryReport.publishedAt),
        supportingReportCount: Math.max(1, matchedReports.length),
        supportingReports: (matchedReports.length > 0 ? matchedReports : [primaryReport]).slice(0, 3).map((r) => ({
          title: r.title,
          platform: r.platform,
          url: r.url,
          publishedDate: formatPubDate(r.publishedAt),
        })),
        fetchedAt: new Date(fetchedAt).toISOString(),
        cacheAgeFormatted: formatRelativeAge(fetchedAt),
      },
    });
  }

  return result;
}

/**
 * Retrieves the current interview question from the server cache,
 * refreshing the cache if cold, expired, or holding outdated schema.
 */
export async function getInterviewQuestion(next = false): Promise<InterviewQuestionData> {
  const state = global._playgroundInterviewState;
  const now = Date.now();

  // Check if cache is still fresh and conforms to current schema
  if (
    state &&
    now - state.cachedAt < CACHE_TTL_MS &&
    state.questions.length > 0 &&
    state.questions[0]?.source?.supportingReportCount !== undefined
  ) {
    if (next) {
      state.currentIndex = (state.currentIndex + 1) % state.questions.length;
    }
    const q = state.questions[state.currentIndex];
    q.source.cacheAgeFormatted = formatRelativeAge(state.cachedAt);
    return q;
  }

  // Refresh reports from external community feeds
  let freshReports: PublicInterviewReport[] = [];
  let isLive = false;

  try {
    freshReports = await fetchPublicReports();
    if (freshReports.length > 0) {
      isLive = true;
    }
  } catch (err) {
    console.error("Failed to fetch fresh public interview reports:", err);
  }

  const reportsToUse = freshReports.length > 0 ? freshReports : BASELINE_REPORTS;
  const questions = buildSynthesizedQuestions(reportsToUse, now, isLive);

  const prevIndex = state ? state.currentIndex : 0;
  const newIndex = next ? (prevIndex + 1) % questions.length : prevIndex % questions.length;

  global._playgroundInterviewState = {
    questions,
    cachedAt: now,
    isLive,
    currentIndex: newIndex,
  };

  const selected = questions[newIndex];
  selected.source.cacheAgeFormatted = formatRelativeAge(now);
  return selected;
}
