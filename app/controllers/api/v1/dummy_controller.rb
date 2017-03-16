class Api::V1::DummyController < ApplicationController
  def index
    if params[:request_type] == "analyze"
      analyze
    elsif params[:request_type] == "plot_graph"
      plot_graph
    else
      render json: "Invalid request"
    end
  end

  private

  def plot_graph
    data = Hash.new { |h,k| h[k] = 0 }
    CSV.foreach("#{Rails.root}/public/recent-grads.csv", { headers: true, converters: :all }) do | row |
      if params[:measures].blank? || params[:measures].include?(row[params[:measure_type]])
        params[:dimensions].each do |dimension|
          data[dimension] += row[dimension]
        end
      end
    end
    render json: data
  end

  def analyze
    set_measures_and_dimensions
    data = {
      measures: @measures,
      dimensions: @dimensions
    }
    render json: data
  end

  def set_measures_and_dimensions
    @measures = Hash.new { |h,k| h[k] = Set.new }
    @dimensions = Set.new
    CSV.foreach("#{Rails.root}/public/recent-grads.csv", { headers: true, converters: :all }) do | row |
      keys = row.to_h.keys
      keys.each do |key|
        if row[key].kind_of?(String)
          @measures[key].add(row[key])
        else
          @dimensions.add(key)
        end
      end
    end
  end

end
