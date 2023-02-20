import React, {useEffect , useState} from "react";

const UnMountTest = () => {
    useEffect( () =>{
        console.log("Mount!") // Mount 시점에 실행되게 한다.


        return () => { // 함수를 하나 리턴하게 하면 unMount시점에 실행되게 된다.
            // UnMount 시점에 실행되게 한다.
            console.log("UnMount!!")
        };
    }, []);

    return <div>UnMount Testing Component</div>
}

const LifeCycle = () => {

    const [isVisible,setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return(
        <div style={{padding:20}}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnMountTest/>} 
        </div>
    );

    



    return <div style={{padding:20}}>
        
    </div>;
}

export default LifeCycle;