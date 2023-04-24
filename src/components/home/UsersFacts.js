import React,{useState,useEffect,useRef} from 'react'
import {useSpring,animated} from '@react-spring/web'


function Number({ n }) {
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true);
          observer.unobserve(ref.current);
        }
      },
      {
        rootMargin: '-50px 0px -50px 0px', // adjust as needed
      }
    );

    observer.observe(ref.current);
      const current = ref.current
    return () => {
      if (observer.current && current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const { number } = useSpring({
    from: {number : 0},
    number: startAnimation ? n : 0,
    delay: 500,
    config: {mass: 1,tension: 100, friction: 30},
  })
  return (
      <animated.div ref = {ref}>{number.to((n) => n.toFixed(0))}</animated.div>
  )
}

export default function UsersFacts() {
  
  return (
    <div className='user-facts'>
        <div className='user-info'>
            <span className='number'><Number n = {10000} /></span>
            <p className='text-info'>Skills learned</p>
        </div>
        <div className='user-info'>
            <span className='number'>76k+</span>
            <p className='text-info'>Happy users</p>
        </div>
        <div className='user-info'>
            <span className='number'>37k+</span>
            <p className='text-info'>Good reviews</p>
        </div>
    </div>
  )
}
