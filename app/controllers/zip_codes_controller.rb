class ZipCodesController < ApplicationController

  @log ||= Logger.new("#{Rails.root}/log/geonames.log")

  def show
    params[:location] ||= 'New York City'
    Geonames.username = 'sidlab'
    postal_code_sc = Geonames::PostalCodeSearchCriteria.new
    postal_code_sc.place_name = params[:location]
    @postal_codes = Geonames::WebService.postal_code_search postal_code_sc
  end
end
