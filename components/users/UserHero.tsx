"use client"
import Image from 'next/image'
import Avatar from '../Avatar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
    coverImage?: string;
}

interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
    const [data, setData] = useState<User | null>(null); 
    useEffect(() => {
        const fetchData = async () => {
            if (userId) { // Ensure userId is defined
                try {
                    const response = await axios.get(`/api/user/${userId}`);
                    setData(response.data.existingUser);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
    }, [userId]);

    if (data) {
        return (
            <div className='bg-neutral-700 h-44 relative'>
                {
                    data.coverImage && (
                        <Image
                            src={data.coverImage}
                            alt='cover Image'
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    )
                }
                <div className='absolute -bottom-16 left'>
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        )
    }

    return null; // Render nothing or a loading state if data is not yet available
}

export default UserHero;
