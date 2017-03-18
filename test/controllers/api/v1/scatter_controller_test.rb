require 'test_helper'

class Api::V1::ScatterControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_scatter_index_url
    assert_response :success
  end

end
