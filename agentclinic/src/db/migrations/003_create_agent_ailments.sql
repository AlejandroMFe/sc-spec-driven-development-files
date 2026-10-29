CREATE TABLE agent_ailments (
  agent_id INTEGER NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  ailment_id INTEGER NOT NULL REFERENCES ailments(id) ON DELETE CASCADE,
  PRIMARY KEY (agent_id, ailment_id)
);

CREATE INDEX IF NOT EXISTS idx_agent_ailments_ailment_id ON agent_ailments(ailment_id);

