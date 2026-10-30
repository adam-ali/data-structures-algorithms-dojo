export interface Topic {
  id: string;
  name: string;
  /** What each level means for this topic. Level 1 = the bare pattern; higher = disguised / combined. */
  levels: string[];
}

export const TOPICS: Topic[] = [
  {
    id: "arrays-hashing",
    name: "Arrays & Hashing",
    levels: [
      "Frequency counting with a Map/Set",
      "Grouping / bucketing by a computed key",
      "Prefix sums and prefix products",
      "Hashing combined with another pattern (e.g. longest consecutive run)",
    ],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    levels: [
      "Opposite ends on a sorted array",
      "Same-direction (read/write) pointers, in-place edits",
      "Sort first, then two pointers (3-sum style, skipping duplicates)",
      "Pointers on disguised problems (container/area, trapping water)",
    ],
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    levels: [
      "Fixed-size window",
      "Variable window with a simple validity condition",
      "Variable window with a frequency map",
      "Minimum window / window with a deque",
    ],
  },
  {
    id: "stack",
    name: "Stack & Monotonic Stack",
    levels: [
      "Matching / validation with a stack",
      "Stack-based evaluation and simulation",
      "Monotonic stack: next greater/smaller element",
      "Monotonic stack on disguised problems (histogram area, spans)",
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    levels: [
      "Classic search on a sorted array",
      "Lower/upper bound and first/last occurrence",
      "Rotated or otherwise modified sorted arrays",
      "Binary search on the answer space",
    ],
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    levels: [
      "Traversal and reversal",
      "Fast/slow pointers (middle, cycle detection)",
      "Merging and reordering lists",
      "Combined techniques (k-group reversal, LRU-style design)",
    ],
  },
  {
    id: "trees",
    name: "Trees (DFS/BFS)",
    levels: [
      "Recursive DFS: depth, sums, symmetry",
      "BFS by level",
      "BST properties and validation",
      "Path problems and returning multiple values up the recursion",
    ],
  },
  {
    id: "tries",
    name: "Tries",
    levels: [
      "Insert / search / startsWith",
      "Prefix counting and autocomplete",
      "Wildcard search with DFS",
      "Trie combined with grid backtracking",
    ],
  },
  {
    id: "heaps",
    name: "Heaps / Priority Queue",
    levels: [
      "Implement a min-heap (no built-in exists in JS)",
      "Top-k / k-th largest",
      "Merging k sorted sources",
      "Two heaps (running median) and scheduling",
    ],
  },
  {
    id: "backtracking",
    name: "Backtracking",
    levels: [
      "Subsets and permutations",
      "Combinations with a target sum",
      "Handling duplicates and pruning",
      "Constraint problems (grid word search, N-Queens style)",
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    levels: [
      "Grid BFS/DFS (islands, flood fill)",
      "Adjacency lists, visited sets, connected components",
      "Topological sort and cycle detection",
      "Union-find and shortest paths (BFS / Dijkstra)",
    ],
  },
  {
    id: "dp-1d",
    name: "Dynamic Programming (1D)",
    levels: [
      "Fibonacci-style recurrences",
      "Choose/skip decisions (house robber style)",
      "DP over a string or sequence (decode ways, word break)",
      "Longest increasing subsequence and variants",
    ],
  },
  {
    id: "dp-2d",
    name: "Dynamic Programming (2D)",
    levels: [
      "Grid paths",
      "Two-sequence DP (LCS, edit distance)",
      "Knapsack-style",
      "Interval / state-machine DP",
    ],
  },
  {
    id: "greedy",
    name: "Greedy",
    levels: [
      "Simple local choice (max subarray, jumps)",
      "Sort then greedy",
      "Greedy with a counter or heap",
      "Proving greedy works vs. needing DP",
    ],
  },
  {
    id: "intervals",
    name: "Intervals",
    levels: [
      "Merge overlapping intervals",
      "Insert into sorted intervals",
      "Counting overlaps / minimum removals",
      "Sweep line with events",
    ],
  },
  {
    id: "bits",
    name: "Bit Manipulation",
    levels: [
      "Counting bits and checking powers of two",
      "XOR tricks (single number, missing number)",
      "Bitmasks to represent sets",
      "Bit arithmetic without + or -",
    ],
  },
];

export const topicById = (id: string) => TOPICS.find((t) => t.id === id);
