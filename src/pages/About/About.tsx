import { Box, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { consts } from '../../consts/consts';
import './About.css';

export const About = () => {
  return (
        <div className="container mt-5 mb-5 text-center">
            <h1>{ consts.ABOUT.CREATED_BY } Lucas Alejandro Perez</h1>
            <hr />
            <div>
                <img src="../logo192.png" alt="Blockchain Salad" height="192" width="192" />
            </div>
            <p>
                { consts.ABOUT.SOFTWARE_DEVELOPER }  
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
            <div className="mt-2">
                <span className="mr-1">
                    { consts.ABOUT.YOU_CAN_FIND_ME }: 
                </span>
                <span>
                    <a href="https://twitter.com/cripto_lucas" target="_blank" rel="noreferrer" className="text-reset">
                        @cripto_lucas
                    </a>
                </span>
            </div>
            <div className="mt-2">
                <span className="mr-1">
                    Mail: 
                </span>
                <span>
                    <a href="mailto:lucas.alejandro.perez@gmail.com" target="_blank" rel="noreferrer" className="text-reset">
                        lucas.alejandro.perez@gmail.com
                    </a>
                </span>
            </div>
            <div className="mt-2">
                <span className="mr-1">
                    Github: 
                </span>
                <span>
                    <a href="https://github.com/lucasalejandroperez" target="_blank" rel="noreferrer" className="text-reset">
                        https://github.com/lucasalejandroperez
                    </a>
                </span>
            </div>


            <div className="mt-3">
                <span className="tag">React</span>
                <span className="tag">Solidity</span>
                <span className="tag">.NET</span>
            </div>
        </div>
  )
}
