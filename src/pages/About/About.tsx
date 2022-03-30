import './About.css';

export const About = () => {
  return (
    <div className="container mt-5 mb-5 text-center">
            <h1>Created by Lucas Alejandro Perez</h1>
            <hr />
            <div>
                <img src="../logo192.png" alt="Blockchain Salad" height="192" width="192" />
            </div>
            <p>
                Software developer for more than 15 years.  
                <span className="ml-1 mr-2">
                  <img src="../assets/images/argentine-flag.png" width="50" height="30" alt="" />
                </span>
                <span>
                  <img src="../assets/images/italy-flag.png" width="50" height="30" alt="" />
                </span>
            </p>
            <p>
                <strong>Blockchain lover</strong>
            </p>
            <div className="">You can find me on: &nbsp; 
                <a href="https://twitter.com/cripto_lucas" target="_blank" rel="noreferrer" className="text-reset">
                    <i className="fab fa-twitter">@cripto_lucas</i>
                </a>
            </div>
            <div className="mt-2">
                Mail: lucas.alejandro.perez@gmail.com
            </div>

            <div className="mt-3">
                <span className="tag">React</span>
                <span className="tag">Solidity</span>
                <span className="tag">.NET</span>
            </div>
        </div>
  )
}
