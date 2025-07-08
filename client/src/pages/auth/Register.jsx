import Form from '@/components/common/Form'
import Loader from '@/components/common/Loader'
import { registerFormControls } from '@/config/formConfig'
import { registerUserService } from '@/services/auth/AuthServices'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
  userName: '',
  email: '',
  password: ''
}

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { userName, email, password } = formData;

    if (!userName || !email || !password) {
      setError("All fields are required!");
      setLoading(false)
      return;
    }


    setError("")
    const data = await dispatch(registerUserService(formData)).unwrap();
    console.log(" response:", data);
     
    setLoading(false)
    if (data.error) {
      toast.error("Registration Failed", {
        description: data?.message || "Something went wrong. Try again.",
      });
    }
    else {
      toast.success("Registration Successful", {
        description: data?.message || "You can now log in.",
      });
    }
    if (data?.success) {
      navigate("/auth/login");
    }



  };


  return (
    <>
    {
      loading && <Loader/>
    }
      <div className="w-full min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8  font-fire flex justify-center items-center ">
        <div className="w-[350px] md:w-[480px] mx-auto  py-8   ">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#31350c] mb-6 ">
            Create your account
          </h2>

          <Form
            formControls={registerFormControls}
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
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register