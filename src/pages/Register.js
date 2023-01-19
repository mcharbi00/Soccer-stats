import React, { useState } from 'react';
import S3 from 'react-aws-s3'
window.Buffer = window.Buffer || require("buffer").Buffer;


const SignupPage = () => {
    const [Data, setData] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: null
    });

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value, files } = event.target;
        if (name === 'profileImage') {
            setData({ ...Data, [name]: files[0] });
        } else {
            setData({ ...Data, [name]: value });
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const config = {
                bucketName: "soccer-stats-etna",
                region: 'eu-west-3',
                accessKeyId: 'AKIASU2ZTQVTFF3PPUF5',
                secretAccessKey: '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',
            }

            const ReactS3Client = new S3(config);

            const newFileName = 'test-file';
            const file = Data.profileImage;
            ReactS3Client.uploadFile(file, newFileName).then((data) => {
                console.log(data);
                if (data.status === 204) {
                    console.log("success");
                    console.log(data.location)
                } else {
                    console.log("fail");
                }
            });


        }

        catch (error) {
            console.log(error);
        }

    }



    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={Data.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={Data.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={Data.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Profile Image:
                    <input
                        type="file"
                        name="profileImage"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;


