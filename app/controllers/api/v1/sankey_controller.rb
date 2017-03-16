class Api::V1::SankeyController < ApplicationController
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
    data = []
    CSV.foreach("#{Rails.root}/public/sankey-data.csv", { headers: true, converters: :all }) do | row |
      row_data = {}
      if params[:sources].blank? || params[:sources].include?(row["source"]) ||
        params[:targets].blank? || params[:targets].include?(row["target"])
        data << row.to_h
      end
    end
    render json: data
  end

  def analyze
    set_sources_and_targets
    data = {
      sources: @sources,
      targets: @targets
    }
    render json: data
  end

  def set_sources_and_targets
    @sources = Set.new
    @targets = Set.new
    CSV.foreach("#{Rails.root}/public/sankey-data.csv", { headers: true }) do | row |
      @sources.add(row["source"])
      @targets.add(row["target"])
    end
  end
end
