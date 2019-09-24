CREATE (:Test{message:"Hello World"})
CREATE (:Test{message:"New World"})
CREATE (p1:Player{name:"Taffy"})
SET p1.uuid=apoc.create.uuid()
CREATE (p2:Player{name:"Suzannah"})
SET p2.uuid=apoc.create.uuid()

CREATE INDEX ON :Player(uuid)
CREATE INDEX ON :Game(uuid)