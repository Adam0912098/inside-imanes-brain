CREATE TABLE site_visits_next (
  id INTEGER PRIMARY KEY,
  visited_at TEXT NOT NULL,
  visit_id TEXT UNIQUE,
  page TEXT NOT NULL CHECK (page IN ('home', 'modules')),
  visitor_id TEXT,
  device TEXT,
  browser TEXT,
  visit_window INTEGER NOT NULL
);
--> statement-breakpoint
INSERT INTO site_visits_next (id, visited_at, page, visitor_id, device, browser, visit_window)
SELECT id, visited_at, page, visitor_id, device, browser, visit_window FROM site_visits;
--> statement-breakpoint
DROP TABLE site_visits;
--> statement-breakpoint
ALTER TABLE site_visits_next RENAME TO site_visits;
--> statement-breakpoint
CREATE INDEX site_visits_window_idx ON site_visits (visit_window);
--> statement-breakpoint
CREATE INDEX site_visits_visited_at_idx ON site_visits (visited_at DESC);
