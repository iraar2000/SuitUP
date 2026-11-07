import { IoMenu, IoClose, IoCloseCircle } from "react-icons/io5";
import { FaHistory, FaRegBookmark, FaEye, FaAngleDown, FaSave, FaAngleLeft } from "react-icons/fa";
import { FaAngleRight, FaThumbsUp, FaPlus, FaCheck, FaCircleCheck } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";

export const Icons = {
    menu: {
        label: 'menu',
        Icon: IoMenu,
    },
    recent: {
        label: 'recent',
        Icon: FaHistory,
    },
    saved: {
        label: 'saved',
        Icon: FaRegBookmark,
    },
    close: {
        label: 'close',
        Icon: IoClose
    },
    leftArrow: {
        label: 'leftArrow',
        Icon: FaAngleLeft
    },
    rightArrow: {
        label: 'rightArrow',
        Icon: FaAngleRight
    },
    downArrow: {
        label: 'downArrow',
        Icon: FaAngleDown
    },
    edit: {
        label: 'edit',
        Icon: CiEdit
    },
    create: {
        label: 'create',
        Icon: MdOutlinePostAdd
    },
    view: {
        label: 'view',
        Icon: FaEye
    },
    thumbUp: {
        label: 'thumbUp',
        Icon: FaThumbsUp
    },
    bin: {
        label: 'bin',
        Icon: ImBin
    },
    plus: {
        label: 'plus',
        Icon: FaPlus
    },
    save: {
        label: 'save-tape',
        Icon: FaSave
    },
    check: {
        label: 'tick',
        Icon: FaCheck
    },
    circleCheck: {
        label: 'circleCheck',
        Icon: FaCircleCheck
    },
    circleClose: {
        label: 'circleClose',
        Icon: IoCloseCircle
    },
    home: {
        label: 'home',
        Icon: AiFillHome
    }
}