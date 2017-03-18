class Api::V1::ScatterController < ApplicationController
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
    return render json: { error: true, message: "Invalid x, y axis" } if params[:x] == params[:y]

    # data = { x: [params[:x]], y: [params[:y]], xlabel: params[:x], ylabel: params[:y] }
    data = { dataArray: [], label: { x: params[:x], y: params[:y] } }
    CSV.foreach("#{Rails.root}/public/scatter-data.csv", { headers: true, converters: :all }) do | row |
      # data[:x] << row[params[:x]]
      # data[:y] << row[params[:y]]

      data[:dataArray] << {
        x: row[params[:x]],
        y: row[params[:y]],
        manufacturer: row["Manufacturer"],
        name: row["Name"]
      }
    end
    render json: data
  end

  def analyze
    set_x_y_axis
    data = {
      x_y_axis: @x_y_axis
    }
    render json: data
  end

  def set_x_y_axis
    @x_y_axis = []
    CSV.foreach("#{Rails.root}/public/scatter-data.csv", { headers: true, converters: :all }) do | row |
      row.to_h.keys.each do |key|
        if row[key].kind_of?(Numeric)
          @x_y_axis << key
        end
      end
      break
    end
  end
end
