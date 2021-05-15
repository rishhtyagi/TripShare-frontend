import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center text-white mb-5">Developers</h1>
        <div>
          <div className="container">
            <div className="row gutters-lg">
              <div className="col-md-4 mb-3 text-center text-dark">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="mt-3">
                        <h3 className="mb-3">Rishabh Tyagi</h3> <p>MT2020019</p>
                        <p>
                          International Institute of Information Technology,
                          Bangalore{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3 text-center text-dark">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="mt-3">
                        <h3 className="mb-3">Rushi Shah</h3> <p>MT2020113</p>
                        <p>
                          International Institute of Information Technology,
                          Bangalore{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div className="col-md-4 mb-3 text-center text-dark">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="mt-3">
                        <h3 className="mb-3">Nayan Chaturvedi</h3>{" "}
                        <p>MT2020114 </p>
                        <p>
                          International Institute of Information Technology,
                          Bangalore{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
