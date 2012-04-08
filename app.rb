# rubygems
require 'sinatra'
require 'json'

# libs
require File.join(File.dirname(__FILE__), 'couch.rb')

#
# => Homepage
#
get '/' do
  File.read(File.join('public', 'index.html'))
end

#
# => Display photos from couchDB
#
get '/photos' do
  server = Couch::Server.new("localhost", "5984")
  res = server.get("/boneimage/_design/app/_view/photos")
  json = res.body
  
  content_type :json
  json
end

#
# => Add a photo
#
post '/photos' do
  server = Couch::Server.new("localhost", "5984", "admin", "admin")
  server.post("/boneimage", request.env["rack.input"].read)
  
  "ok"
end

#
# => Update photo
#
put '/photos/:id' do
  params[:id]
end

#
# => Render file
#
get '/get/:id' do
  
  # find record
  server = Couch::Server.new("localhost", "5984")
  res = server.get("/boneimage/"+ params[:id])
  record = JSON.parse(res.body)
    
  # read file and send to browser
  file = File.join(File.dirname(__FILE__), 'datas', record['path'])
  content_type record['mime-type']
  File.open(file, 'r')
end