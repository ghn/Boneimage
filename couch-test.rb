require File.join(File.dirname(__FILE__), 'couch.rb')

server = Couch::Server.new("localhost", "5984", "admin", "admin")
server.put("/foo/", "")