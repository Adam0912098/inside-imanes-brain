CREATE TABLE site_visits (
  id INTEGER PRIMARY KEY,
  visited_at TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  page TEXT NOT NULL CHECK (page IN ('home', 'modules')),
  device TEXT NOT NULL,
  browser TEXT NOT NULL,
  visit_window INTEGER NOT NULL,
  UNIQUE (visitor_id, page, visit_window)
);
--> statement-breakpoint
CREATE INDEX site_visits_window_idx ON site_visits (visit_window);
--> statement-breakpoint
CREATE INDEX site_visits_visited_at_idx ON site_visits (visited_at DESC);
