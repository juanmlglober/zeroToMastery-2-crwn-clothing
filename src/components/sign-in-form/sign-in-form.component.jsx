import { useState } from "react"

import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase/firebase.utils"

import "./sign-in-form.styles.scss"

const defaultFormFields = {
  email: "",
  password: ""
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields()
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        alert('Incorrect password for this email')
      }
      if (error.code === "auth/user-not-found") {
        alert('Incorrect password for email')
      }
      console.log(error, "MANSA CAGADA")
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
