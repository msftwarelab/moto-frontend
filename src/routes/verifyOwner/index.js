import React from "react";
import NewListLayout from "../../components/Layout/NewListLayout";
import VerifyOwner from "./VerifyOwner";

async function action({ store, query, params }) {
    const isAuthenticated = store.getState().runtime.isAuthenticated;

    if (!isAuthenticated && !isAdminAuthenticated) {
        return { redirect: '/login' };
    }

    return {
        title: 'Verify Owner',
        component: <NewListLayout>
            <VerifyOwner />
        </NewListLayout>
    }
}

export default action;