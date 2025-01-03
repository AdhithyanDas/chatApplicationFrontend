import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { Camera, User, Mail, ArrowLeft, Trash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAccountApi, profileUpdateApi } from '../../services/allApis';
import { authContext } from '../../context/ContextApi';
import { useSocketContext } from '../../context/SocketContext';
import profilepicavatar from '../../images/avatar.png';
import base_Url from '../../services/baseUrl';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function Profile() {

    const [userData, setUserData] = useState({
        profilePic: '', fullName: '', email: '',
    });

    const [preview, setPreview] = useState(''); // profilePic-preview
    const [loading, setLoading] = useState(false); // loading-spinner

    const { handleLogout } = useSocketContext() // logoutSocketContext
    const { authContextStatus, setAuthContextStatus } = useContext(authContext) // contextStatus

    const nav = useNavigate();

    // setUserData
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

    // profilePic
    useEffect(() => {
        if (userData.profilePic.type) {
            setPreview(URL.createObjectURL(userData.profilePic));
        } else {
            setPreview('');
        }
    }, [userData.profilePic]);

    // profileUpdation
    const handleProfileUpdation = async () => {
        setLoading(true);
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

            if (res.status == 200) {
                handleLogout()
                toast.success("Your changes have been saved!")
                setAuthContextStatus(false)
                nav('/');
            } else {
                toast.error("Full Name is required!")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // deleteAccount
    const handleDeleteAccount = async (email, e) => {
        e.preventDefault();
        const result = await Swal.fire({
            title: "Delete Account?",
            text: "Are you sure you want to delete your account?",
            icon: "warning",
            showCancelButton: true,
            background: "#1B1B1F",
            color: "#EDEDED",
            iconColor: "red",
            confirmButtonColor: "#004080",
            cancelButtonColor: "#3C3C46",
            confirmButtonText: "Yes, Delete My Account!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            const header = {
                'Content-Type': 'application/json',
                Authorization: `Token ${sessionStorage.getItem('token')}`,
            };

            const res = await deleteAccountApi(email, header);

            if (res.status == 200) {
                handleLogout()
                toast.success("Your account has been successfully deleted!")
                setAuthContextStatus(false)
                nav('/');
            }
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '91vh', background: '#25252B' }} >
                <div className="profile-second-container px-4" style={{ minWidth: '35vw', paddingBottom: '2%' }}>
                    <div className="d-flex justify-between">
                        {/* leftArrow */}
                        <Link to={'/home'}>
                            <button className="btn" style={{ color: '#EDEDED', border: '0', marginLeft: '-23px' }}>
                                <ArrowLeft />
                            </button>
                        </Link>

                        {/* accountDelete */}
                        <Link to={'/'}>
                            <button
                                onClick={(e) => handleDeleteAccount(userData.email, e)}
                                className="btn"
                                style={{ color: '#FF3B30', border: '0', marginRight: '-23px' }}
                            >
                                <Trash />
                            </button>
                        </Link>
                    </div>

                    {/* profileInfo */}
                    <h3 className="text-white text-center fw-bold">Profile</h3>
                    <p className="text-center" style={{ color: '#EDEDED' }}>Your profile information</p>

                    <div className="d-flex justify-content-center relative">
                        {/* profilePic */}
                        <img
                            className="w-32 h-32  rounded-full object-cover border-4"
                            src={
                                preview ? preview : sessionStorage.getItem('profilePic')
                                    ? `${base_Url}/profilePics/${sessionStorage.getItem('profilePic')}` : profilepicavatar
                            }
                            alt="profile"
                        />

                        {/* profilePicLabel */}
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
                            {/* fullName */}
                            <label htmlFor='fullname' className="d-flex text-white">
                                <User className="w-4 h-4 mt-1" />
                                <span className="ms-1">Full Name</span>
                            </label>
                            <input
                                id='fullname'
                                className='profile-first-input'
                                type="text"
                                defaultValue={userData.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                            />
                        </div>
                        <div className="d-grid mt-3">
                            <div className="d-flex profile-second-input">
                                {/* email */}
                                <Mail className="w-4 h-4 mt-1" />
                                <span className="ms-1">Email address</span>
                            </div>
                            <input type="text" className="profile-second-input border-0" value={userData.email} readOnly />
                        </div>
                    </div>

                    <div className="mt-4 d-grid">
                        {/* submit-btn */}
                        <button
                            className="btn text-white profile-save-button"
                            onClick={handleProfileUpdation}
                            disabled={loading}
                        >
                            {loading ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
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
