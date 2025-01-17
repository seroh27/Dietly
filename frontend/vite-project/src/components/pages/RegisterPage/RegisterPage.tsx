import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../../../App.css'
import Gradient from '../../gradient';

const RegistrationForm: React.FC = () => {

  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    gender: 'Male',
    weight: '',
    height: '',
    age: '',
    exercise_level: 'little or no exercise',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [uniqueEmail, setUniqueEmail] = useState(true);
  const [ageLimit, setAgeLimit] = useState(true);
  const [weightLimit, setWeightLimit] = useState(true);
  const [heightLimit, setHeightLimit] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRegistered(false);
    const { name, value } = e.target;
    if (name === 'password2') {
      if (formData.password !== value && formData.password2 != '') {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);
      }
    }
    else if (name == 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setUniqueEmail(true);
      } else {
        setUniqueEmail(false);
      }
    }
    
    if (name == 'weight') {
      setWeightLimit(true);
    }
    else if (name == 'height') {
      setHeightLimit(true);
    }
    else if (name == 'age') {
      setAgeLimit(true);
    }

    if (name == "gender") {
      console.log(value);
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    setRegistered(false);
    e.preventDefault();
    if (passwordsMatch) {
      try {
        const modifiedFormData = {
          "user_id": formData.email,
          "first_name": formData.first_name,
          "last_name": formData.last_name,
          "age": parseInt(formData.age),
          "weight": parseInt(formData.weight),
          "height": parseInt(formData.height),
          "activity_level": formData.exercise_level,
          "password": formData.password,
          "password2": formData.password2,
          "gender": formData.gender,
        };
        const response = await axios.post('http://localhost:4050/api/user/register/', modifiedFormData,
          {
            headers: {
                "Content-Type": 'application/json'
            }
          }
        )
        setRegistered(true);
      } catch (error) {
        if (error.response.data.hasOwnProperty("user_id")) {
          setUniqueEmail(false);
        }
        if (error.response.data.hasOwnProperty("weight")) {
          setWeightLimit(false);
        }
        if (error.response.data.hasOwnProperty("height")) {
          setHeightLimit(false);
        }
        if (error.response.data.hasOwnProperty("age")) {
          setAgeLimit(false);
        }
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 font">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 dir="rtl" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          شروع مسیر سلامتی با دایتلی!
        </h2>
      </div>

      <Gradient />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div dir="rtl">
            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
              نام
            </label>
            <div className="mt-2">
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
              نام خانوادگی
            </label>
            <div className="mt-2">
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label dir="rtl" htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              نشانی ایمیل
            </label>
            <div className={uniqueEmail ? "mt-2" : "mt-2"} style={uniqueEmail ? {} : { border: '2px solid red', borderRadius: '5px'}}>
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className={uniqueEmail ? 
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                }
                placeholder='you@example.com'
              />
            </div>
          </div>

          <div>
            <label dir="rtl" htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              رمز عبور
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"             
              />
            </div>
          </div>

          <div>
            <label dir="rtl" htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              تکرار رمز عبور
            </label>
            <div className={passwordsMatch ? "mt-2" : "mt-2"} style={passwordsMatch ? {} : { border: '2px solid red', borderRadius: '5px'}}>
              <input
                id="password2"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
              جنسیت
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option value="Male">مرد</option>
                <option value="Female">زن</option>
              </select>
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
              وزن (کیلوگرم)
            </label>
            <div className={weightLimit ? "mt-2" : "mt-2"} style={weightLimit ? {} : { border: '2px solid red', borderRadius: '5px'}}>
              <input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                className={weightLimit ? 
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                }
              />
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
              قد (سانتی متر)
            </label>
            <div className={heightLimit ? "mt-2" : "mt-2"} style={heightLimit ? {} : { border: '2px solid red', borderRadius: '5px'}}>
              <input
                id="height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                className={heightLimit ? 
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                }
              />
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
              سن
            </label>
            <div className={ageLimit ? "mt-2" : "mt-2"} style={ageLimit ? {} : { border: '2px solid red', borderRadius: '5px'}}>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className={ageLimit ? 
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                }
              />
            </div>
          </div>

          <div dir="rtl">
            <label htmlFor="exercise_level" className="block text-sm font-medium leading-6 text-gray-900">
              میزان فعالیت
            </label>
            <div className="mt-2">
              <select
                id="exercise_level"
                name="exercise_level"
                value={formData.exercise_level}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="little or no exercise">هیچ</option>
                <option value="light exercise">کم</option>
                <option value="moderate exercise">متوسط</option>
                <option value="hard exercise">بالا</option>
                <option value="very hard exercise">بسیار بالا</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
              ثبت نام
            </button>
            {registered ? <p dir="rtl" style={{color: 'green', }}>
              ثبت‌نام با موفقیت انجام شد
            </p> : null}
          </div>
        </form>

        <p dir="rtl" className="mt-10 text-center text-sm text-gray-500">
          حساب کاربری دارید؟&nbsp;
          <button onClick={() => navigate('/login')} className="font-semibold leading-6 text-emerald-700 hover:text-emerald-600">
            ورود
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
