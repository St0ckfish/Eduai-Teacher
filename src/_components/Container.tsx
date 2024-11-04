import type { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className={`mt-5 lg:ml-[270px] ml-3 mr-3`}>
            {children}
        </div>
     );
}
 
export default Container;