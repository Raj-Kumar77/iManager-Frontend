import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {

    const { selectedPlan, backendUrl } = useAppContext()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [subscription, setSubscription] = useState(selectedPlan.subscriptionType.toUpperCase())
    const [subscriptionPrice, setSubscriptionPrice] = useState(selectedPlan.subscriptionPrice)

    useEffect(() => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
            return () => {
            document.body.removeChild(script);
            };
        }, []);


        const handleRegistrationSubmit = async (e) => {
            e.preventDefault()
    
            try {
    
    
                const response = await axios.post(backendUrl + `/api/v1/org/registration?amount=${subscriptionPrice}&currency=INR`, { name, email, password, subscription })
    
                const order = response.data
    
                if (!order.id) {
                    toast.error("Error: no Order Id")
                    return;
                }
    
                const paymentDescription = `Subscription Plan: ${subscription}`;
    
                //Initiate Razorpay Order
                const options = {
                    key: "rzp_test_M5M2X3c0ahOpJl", // Replace with your Razorpay API Key
                    amount: order.amount,
                    currency: order.currency,
                    name: "iManager",
                    description: paymentDescription,
                    order_id: order.id,
                    handler: function (response) {
                        toast.success(`Payment Successful for ${subscription}! Payment ID: ${response.razorpay_payment_id}`);
                        navigate("/");
                    },
                    theme: {
                        color: "#3399cc"
                    },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (error) {
                console.log("Error: " + error);
                alert("Payment Initiation failed");
            }
        }

    return (
        <section className="bg-gradient-to-r from-gray-800 to to-gray-900 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    {/* <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    /> */}
                    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className='bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-center font-bold text-3xl pb-1'>iManager</h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleRegistrationSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your name"
                                    required=""
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="subscription"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Subsciption Type
                                </label>
                                <input
                                    type="text"
                                    name="subscription"
                                    id="subscription"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={subscription}
                                    disabled
                                />
                                <div className='text-gray-500 text-xs mt-2'>Selected Plan - INR {selectedPlan.subscriptionPrice}</div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-gradient-to-r from-orange-500 to-orange-800 hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register
