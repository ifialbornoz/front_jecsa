import Navigation from "../Navigation"

export default function Layout({children}) {
    return (
        <>
           <Navigation/>
            {children}
            {/*<h4>Footer</h4>*/}
        </>
    )
}
