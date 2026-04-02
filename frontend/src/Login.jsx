import React from "react";

const Login = () => {
    return (
        <div className="flex justify-center items-center my-10">
            <div className="card card-border bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                What is your name?
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Type here"
                            />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
