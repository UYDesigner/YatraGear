import Form from '@/components/common/Form'
import Loader from '@/components/common/Loader'
import { loginFormControls } from '@/config/formConfig'
import { loginUserService } from '@/services/auth/AuthServices'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
  email: '',
  password: ''
}


const LogIn = () => {
  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required!");
      setLoading(false)
      return;
    }

    // console.log("Submitted data:", formData)

    setError("")

    const response = await dispatch(loginUserService(formData)).unwrap();
    // console.log("login response",response, "\nuser info", response.user)
    setLoading(false)

    if (response.error) {
      toast.error("Login Failed", {
        description: response?.message || "Something went wrong. Try again.",
      });
    }
    else {
      toast.success("Login Successful", {
        description: response?.message || "Enjoy our services",
      });
    }
    if (response?.success) {
      navigate("/shop/home");
    }
  }

  return (<>
    {
      loading && <Loader />
    }

    <div className="w-full min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8  font-fire flex justify-center items-center ">
      <div className=" w-[350px] md:w-[480px] mx-auto  py-8   ">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#31350c] mb-6 ">
          Login to your account
        </h2>

        <Form
          formControls={loginFormControls}
          buttonText="Continue"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        {error && (
          <p className="text-sm text-red-600 mt-2 text-center">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}

export default LogIn