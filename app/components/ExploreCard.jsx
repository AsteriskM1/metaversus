'use client';

import { useState } from "react";

import { motion } from "framer-motion";
import styles from "@/styles";
import { fadeIn } from "@/utils/motion";

import { Modal, Button, Text } from "@nextui-org/react";
import { worldDescription } from "@/constants";


export default function ExploreCard({ id, imgUrl, title, index, active, handleClick }) {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  
  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10]' :
        'lg:flex-[0.2] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
      onClick={() => handleClick(id)}
    >
      <img 
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {active !== id ? (
        <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] group">
          <div className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}>
            <img 
              src="/headset.svg"
              alt="headset"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="font-normal text-[16px] leading-[20px] text-white uppercase">Enter the Metaverse</p>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">{title}</h2>
          <div>
            <Button onPress={handler} className="mt-4 hidden group-hover:flex flex-wrap justify-center">
                <img 
                  src="/arrow-down.svg"
                  alt="arrow down"
                  className="w-[30px] h-[30px] object-contain mx-3 hidden group-hover:flex"
                />
                <p className="font-normal text-[24px] leading-[29px] text-white uppercase hidden group-hover:flex">More</p>
            </Button>
            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
              className="gradient-06"
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  {title}
                </Text>
              </Modal.Header>
              <Modal.Body>
                {worldDescription}
              </Modal.Body>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </motion.div>
  )
}

