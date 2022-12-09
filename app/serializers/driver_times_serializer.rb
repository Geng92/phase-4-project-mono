class DriverTimesSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :age, :country, :car, :bio, :admin
  has_many :time_trials

  def time_trials 
    object.time_trials.order(:date).reverse
  end
end
