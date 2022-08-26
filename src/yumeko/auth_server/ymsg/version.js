const version = require("../../version");

module.exports = (req, res) => {
    res.write(
`
<html>
<head>
        <title>Yumeko Login Server</title>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap" rel="stylesheet">
        <style>
            body {
                background-color: #f1f1f1;
                margin: 0;
                height: 100%;
            }
            
            .info-container {
                position: relative;
                top: 50%;
                margin: -350px auto;
                
                background-color: white;
                width: 700px;
                text-align: center;
                border: 1px solid black;
                border-radius: 3px;
                
                font-family: 'Open Sans', sans-serif;
            }
            
            .info-container .content {
                padding: 10px;
            }
            
            @media only screen and (max-device-width: 640px) {
                .info-container {
                    width: 95%;
                }
            }
        </style>
</head>
<body>
        <div class="info-container">
            <div class="content">
                <h3>
                    Yumeko ${version.formatted}
                </h3>
                <p>
                    Yahoo! Messenger Service Emulator<br>
                    Login Server
                    <br>
                    <small>Made with <3 by <a href="https://github.com/r0neko">r0neko</a>.</small>
                    <br>
                    <br>
                    <a href="https://nmess.r0neko.me">NostalgiaMess Website</a>
                </p>
            </div>
        </div>   
</body>
</html>
`
    );
    res.end();
};