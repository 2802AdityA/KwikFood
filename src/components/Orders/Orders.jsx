import React, { useState } from "react";
import "../../styles/pages/orders.css";

function Orders() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Half sleeve T-shirt",
      price: 50,
      quantity: 5,
      status: "ready",
    },
    {
      id: 2,
      name: "Full sleeve T-shirt",
      price: 50,
      quantity: 1,
      status: "preparing",
    },
    {
      id: 3,
      name: "Half sleeve Shirt",
      price: 20,
      quantity: 10,
      status: "nahi derehe",
    },
  ]);

  const grandTotal = 0;

  const calculateGrandTotal = () => {
    let total = 0;
    for (let i = 0; i < products?.length; i++) {
      const element = products[i];
      total += element?.price * element?.quantity;
    }
    return total;
  };

  return (
    <div className="row">
      <div className="col-xl-8">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-nowrap">
                <thead className="table-light">
                  <tr>
                    <th>Product Desc</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th colSpan="2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    return (
                      <tr>
                        <td>
                          <h5 className="font-size-14 text-truncate">
                            <a
                              href="ecommerce-product-detail.html"
                              className="text-dark"
                            >
                              {product.name}
                            </a>
                          </h5>
                          <p className="mb-0">
                            Color : <span className="fw-medium">Maroon</span>
                          </p>
                        </td>
                        <td>{product.price}</td>
                        <td>
                          <div>{product.quantity}</div>
                        </td>
                        <td>
                          <div>{product.status}</div>
                        </td>
                        <td>{product.price * product.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        {/* <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Card Details</h5>

                        <div className="card bg-primary text-white visa-card mb-0">
                            <div className="card-body">
                                <div>
                                    <i className="bx bxl-visa visa-pattern"></i>

                                    <div className="float-end">
                                        <i className="bx bxl-visa visa-logo display-3"></i>
                                    </div>

                                    <div>
                                        <i className="bx bx-chip h1 text-warning"></i>
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="col-4">
                                        <p>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <p>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                            <i className="fas fa-star-of-life m-1"></i>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <h5 className="text-white float-end mb-0">12/22</h5>
                                    <h5 className="text-white mb-0">Fredrick Taylor</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Grand Total :</td>
                    <td>{calculateGrandTotal()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
