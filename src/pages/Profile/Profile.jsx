import React, { useEffect, useState } from 'react';
import './Profile.css';
import profilepicavatar from '../../images/avatar.png';
import { Camera, User, Mail, ArrowLeft, Trash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteaccountApi, profileUpdateApi } from '../../services/allApis';
import base_Url from '../../services/baseUrl';

function Profile() {
    const [userData, setUserData] = useState({
        profilePic: '',
        fullName: '',
        email: '',
    });

    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const nav = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('email')) {
            setUserData({
                ...userData,
                email: sessionStorage.getItem('email'),
                fullName: sessionStorage.getItem('fullName'),
                profilePic: sessionStorage.getItem('profilePic'),
            });
        }
    }, []);

    useEffect(() => {
        if (userData.profilePic && userData.profilePic.type) {
            setPreview(URL.createObjectURL(userData.profilePic));
        } else {
            setPreview('');
        }
    }, [userData.profilePic]);

    const handleProfileUpdation = async () => {
        if (!userData.email || !userData.fullName) return;

        setLoading(true); // Set loading to true when the update starts

        const { profilePic, fullName, email } = userData;

        try {
            const header = {
                'Content-Type': userData.profilePic.type ? 'multipart/form-data' : 'application/json',
                Authorization: `Token ${sessionStorage.getItem('token')}`,
            };

            let res;
            if (userData.profilePic.type) {
                const fd = new FormData();
                fd.append('profilePic', profilePic);
                fd.append('fullName', fullName);
                fd.append('email', email);

                res = await profileUpdateApi(fd, header);
            } else {
                res = await profileUpdateApi({ profilePic, fullName, email }, header);
            }

            if (res.status === 200) {
                sessionStorage.clear();
                nav('/');
                window.location.reload();
            } else {
                console.error('Profile update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false); // Reset loading state after update completes
        }
    };

    const handleDeleteAccound = async (email) => {
        const header = {
            'Content-Type': 'application/json',
            Authorization: `Token ${sessionStorage.getItem('token')}`,
        };

        const res = await deleteaccountApi(email, header);
        if (res.status === 200) {
            nav('/');
        }
    };

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '91vh', background: '#25252B' }}
            >
                <div className="profile-second-container px-4" style={{ width: '40vw', height: '76vh' }}>
                    <div className="d-flex justify-between">
                        <Link to={'/home'}>
                            <button className="btn" style={{ color: '#EDEDED', border: '0', marginLeft: '-23px' }}>
                                <ArrowLeft />
                            </button>
                        </Link>
                        <Link to={'/'}>
                            <button
                                onClick={() => handleDeleteAccound(userData.email)}
                                className="btn"
                                style={{ color: '#FF3B30', border: '0', marginRight: '-23px' }}
                            >
                                <Trash />
                            </button>
                        </Link>
                    </div>
                    <h3 className="text-white text-center fw-bold">Profile</h3>
                    <p className="text-white text-center">Your profile information</p>
                    <div className="d-flex justify-content-center relative">
                        <img
                            className="size-32 rounded-full object-cover border-4"
                            src={
                                preview
                                    ? preview
                                    : sessionStorage.getItem('profilePic')
                                        ? `${base_Url}/profilePics/${sessionStorage.getItem('profilePic')}`
                                        : profilepicavatar
                            }
                            alt=""
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom- ms-24 mt-20 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 profile-pic-button"
                        >
                            <Camera className="w-5 h-5 text-base-200" />
                            <input
                                onChange={(e) => setUserData({ ...userData, profilePic: e.target.files[0] })}
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="mt-4 w-100">
                        <div className="d-grid">
                            <div className="d-flex">
                                <User className="w-4 h-4 mt-1 text-white" />
                                <span className="text-white ms-1">Full Name</span>
                            </div>
                            <input
                                type="text"
                                defaultValue={userData.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                            />
                        </div>
                        <div className="d-grid mt-3">
                            <div className="d-flex">
                                <Mail className="w-4 h-4 mt-1 text-white" />
                                <span className="text-white ms-1">Email address</span>
                            </div>
                            <input type="text" className="profile-second-input border-0" value={userData.email} readOnly />
                        </div>
                    </div>

                    <div className="mt-4 d-grid">
                        <button
                            className="btn text-white profile-save-button"
                            onClick={handleProfileUpdation}
                            disabled={loading} // Disable the button during loading
                        >
                            {loading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i> // Loading spinner icon
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
