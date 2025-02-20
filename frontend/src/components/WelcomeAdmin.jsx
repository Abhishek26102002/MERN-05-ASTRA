import React, { useEffect } from "react";
import {
  Heart,
  SlidersHorizontal,
  CircleAlert,
  Zap,
  Crown,
  Archive,
  BadgeIndianRupee,
} from "lucide-react";
import { UserStore } from "../ApiStore/UserStore";
import { PostStore } from "../ApiStore/PostStore";

const WelcomeAdmin = () => {
  const { allUsers, fetchUsers, checkAuth, setuser } = UserStore();
  const { setallpost, fetchAllPost } = PostStore();

  return (
    <div className="stats shadow flex flex-col sm:flex-row">
      <div className="stat">
        <div className="stat-figure text-primary">
          <Heart />
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value text-primary">25.6K</div>
        <div className="stat-desc">21% more</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <Zap />
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value text-secondary">2.6M</div>
        <div className="stat-desc">21% more</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <CircleAlert />
        </div>
        <div className="stat-title">Posts</div>
        <div className="stat-value">{setallpost?.length}</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <SlidersHorizontal />
        </div>
        <div className="stat-title">New Users</div>
        <div className="stat-value">{allUsers?.length}</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <Archive />
        </div>
        <div className="stat-title">Users</div>
        <div className="stat-value">{allUsers?.length}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>

      <div className="relative stat">
        <div className="stat-figure text-secondary">
          <Crown className="z-10 absolute top-0 right-12" />
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={setuser?.profilepic || "./profile.png"} />
            </div>
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-secondary">31 tasks remaining</div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
