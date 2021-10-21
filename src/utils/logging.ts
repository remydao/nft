const logAction = (buyer: string, seller: string, ntfId: number) => {
    console.log("[" + new Date().toUTCString() + "] " + buyer + " has just bought nft with id = " + ntfId + " from " + seller + ".");
}

const logRegistration = (user: any) => {
    console.log("[" + new Date().toUTCString() + "] " + user.email + " has just registered with \"" + user.role + "\" role.");
}

export { logAction, logRegistration };