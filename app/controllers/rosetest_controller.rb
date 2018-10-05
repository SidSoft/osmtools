class RosetestController < ApplicationController
  def show
    api = Rosemary::Api.new
    @node = api.find_node(61785451)
  end
end