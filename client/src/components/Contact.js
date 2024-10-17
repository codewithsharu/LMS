import React from "react";
import "./Contact.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
function Contact() {
  return (
    <MDBFooter
      bgColor="light"
      className="main text-center text-lg-start text-muted"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <img
                src="./logo.png"
                width="140"
                height="40"
                className="d-inline-block align-top"
                alt="Logo"
              />
              <p>
                Sri Aditya Educational Society (ESTD-2000) started a Technical
                <br></br>
                Institution to impart highest <br></br> quality and standards in
                the north<br></br>
                coastal A.P.<br></br>
                <br></br>
                <br></br> Add:K.Kotturu, Tekkali, Srikakulam Call:+91 - 92466
                <br></br>
                57908 Email:info@adityatekkali.edu.in
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <a href="https://www.aicte-india.org" className="text-reset k">
                  AICTE
                </a>
              </p>
              <p>
                <a href="https://www.ugc.gov.in" className="text-reset">
                  UGC
                </a>
              </p>
              <p>
                <a href="https://apsche.ap.gov.in" className="text-reset">
                  APSCHE
                </a>
              </p>
              <p>
                <a href="https://jntugv.edu.in" className="text-reset">
                  JNTU-GV
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Quick links</h6>
              <p>
                <a
                  href="https://adityatekkali.edu.in/admissions.php"
                  className="text-reset"
                >
                  Admissions
                </a>
              </p>
              <p>
                <a
                  href="https://adityatekkali.edu.in/Files/Circulars/STUDENTS%20PORTAL%20FEE%20PAYMENTS.pdf"
                  className="text-reset"
                >
                  Fee Payment Steps
                </a>
              </p>
              <p>
                <a
                  href="https://adityatekkali.edu.in/circulars/Registration_form_New.pdf"
                  className="text-reset"
                >
                  Student Registration Form
                </a>
              </p>
              <p>
                <a
                  href="https://adityatekkali.edu.in/download.php"
                  className="text-reset"
                >
                  Downloads
                </a>
              </p>
              <p>
                <a
                  href="https://adityatekkali.edu.in/antiragging.php"
                  className="text-reset"
                >
                  Anti-Ragging
                </a>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 ">
              <h6 className="text-uppercase fw-bold mb-4">Aitam Portals</h6>
              <p>
                <a
                  href="https://exams.adityatekkali.edu.in"
                  className="text-reset"
                >
                  Examination Portal
                </a>
              </p>
              <p>
                <a href="http://115.244.132.22" className="text-reset">
                  Student Portal
                </a>
              </p>
              <p>
                <a href="http://115.244.132.22" className="text-reset">
                  Faculty Portal
                </a>
              </p>
              <p>
                <a href="http://115.244.132.22" className="text-reset">
                  Fee Payment
                </a>
              </p>
              <p>
                <a
                  href="https://alumni.adityatekkali.edu.in"
                  className="text-reset"
                >
                  Alumini Portal
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright-
        <a
          className=" master  "
          href="https://adityatekkali.edu.in/autonomous.php#"
        >
          Aitam Web Team
        </a>
        <p>All Rights Reserved</p>
      </div>
    </MDBFooter>
  );
}

export default Contact;
