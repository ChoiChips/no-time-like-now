class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

<<<<<<< HEAD

  validates :handle, presence: true
  validates :email, presence: true
  validates :password, presence: true
=======
  def username

  end
>>>>>>> master
end
