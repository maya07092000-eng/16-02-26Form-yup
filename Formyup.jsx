import React from 'react'
import './formyup.css'
import { useFormik } from "formik"
import * as Yup from "yup"

function Formyup() {

    const formik = useFormik({

        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: ""
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .trim()
                .min(3, "Minimum 3 characters required")
                .required("Full Name is required"),

            email: Yup.string()
                .trim()
                .email("Invalid email format")
                .required("Email is required"),

            password: Yup.string()
                .min(6, "Minimum 6 characters required")
                .matches(/\g/, "Password must include numbers")
                .required("Password is required"),

            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Password must match")
                .required("Confirm Password is required"),

            age: Yup.number()
                .typeError("Age must be in number")
                .min(18, "Age must be at least 18")
                .nullable()
                .transform((value, orginalValue) =>
                    orginalValue.trim() === "" ? null : value
                )
        }),

        onSubmit: (values) => {
            console.log("Appy", values);
            alert("Submitted Successfully")

        }

    })

    return (
        <div className='display'>
            <h1>Form App</h1>

            <form onSubmit={formik.handleSubmit}>

                <input type="text" name='fullName' placeholder='Full Name...' className='input-all' value={formik.values.fullName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>

                {formik.touched.fullName && formik.errors.fullName && (
                    <p>{formik.errors.fullName}</p>
                )}

                <input type="text" name='email' placeholder='Email' className='input-all' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                {formik.touched.email && formik.errors.email && (
                    <p className='error-input'>{formik.errors.email}</p>
                )}

                <input type="password" name='password' placeholder='Password' className='input-all' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                {formik.touched.password && formik.errors.password && (
                    <p className='error-input'>{formik.errors.fullName}</p>
                )}

                <input type="password" name='confirmPassword' placeholder='Confirm Password' className='input-all' value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />


                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className='error-input'>{formik.errors.confirmPassword}</p>
                )}

                <input type="text" name='age' placeholder='Age (Optional)' className='input-all' value={formik.values.age} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                {formik.touched.age && formik.errors.age && (
                    <p className='error-input'>{formik.errors.age}</p>
                )}


                <button type='submit' className='sub-btn'>Appy Now</button>

            </form>


        </div>
    )
}

export default Formyup
