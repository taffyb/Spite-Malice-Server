//params: {uuid:}

MATCH (p:Player{uuid:$uuid}) 
RETURN p as player