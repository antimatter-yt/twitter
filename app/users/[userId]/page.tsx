"use client";
import Header from '@/components/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUsers from '@/hooks/useUser';

const UserView = ({ params }: { params: { userId: string } }) => {
    const { userId } = params;
    const {data:users, isLoading} = useUsers(userId as string)
    console.log(userId)
        return (
            <>
                <Header showBackArrow label='User Profile' />
                <UserHero userId={userId}/>
                <UserBio userId={userId}/>

            </>
        );
};

export default UserView;
