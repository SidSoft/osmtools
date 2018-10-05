class OvertestController < ApplicationController
  require 'overpass_api_ruby'
  require 'json'

  def show
    options = { timeout: 900, out: 'json' }

    overpass = OverpassAPI::QL.new(options)

    q = params[:q].blank? ? 'London' : params[:q]

    query = 'node[~"^name:.*$"~"^' + q + '"];(._;>;);out body;'

    render json: overpass.query(query)
  end

  def georeverse
    options = { timeout: 900, out: 'json' }

    overpass = OverpassAPI::QL.new(options)

    s = params[:s].blank? ? '51.249' : params[:s]
    n = params[:n].blank? ? '51.251' : params[:n]
    w = params[:w].blank? ? '7.148' : params[:w]
    e = params[:e].blank? ? '7.152' : params[:e]
    q = s + ',' + w + ',' + n + ',' + e

    query = 'node(' + q + ')(if:count_tags() > 0);(._;>;);out body;'

    render json: overpass.query(query)
  end

end
