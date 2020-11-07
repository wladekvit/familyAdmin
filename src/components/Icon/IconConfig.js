import React from "react";

export default {
  menuHamburger: () => (
    <svg width="82" height="80" viewBox="0 0 82 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="20" y="20" width="42" height="40" rx="5" fill="#595860" />
      </g>
      <rect x="25.25" y="39" width="21" height="3" rx="1.5" fill="white" />
      <rect x="25.25" y="29" width="31.5" height="3" rx="1.5" fill="white" />
      <rect x="25.25" y="49" width="31.5" height="3" rx="1.5" fill="white" />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="82"
          height="80"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  ),
  itemMenu: ({ fill = "#A16FE1" }) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="13.5" fill={fill} stroke={fill} />
      <path
        d="M15.9436 19.0439C15.8394 19.1636 15.7112 19.2595 15.5675 19.3252C15.4239 19.3909 15.268 19.4249 15.1102 19.4249C14.9525 19.4249 14.7966 19.3909 14.6529 19.3252C14.5092 19.2595 14.3811 19.1636 14.2769 19.0439C14.1728 19.1636 14.0446 19.2595 13.9009 19.3252C13.7572 19.3909 13.6013 19.4249 13.4436 19.4249C13.2859 19.4249 13.13 19.3909 12.9863 19.3252C12.8426 19.2595 12.7144 19.1636 12.6102 19.0439C12.5061 19.1636 12.3779 19.2595 12.2342 19.3252C12.0905 19.3909 11.9346 19.4249 11.7769 19.4249C11.6192 19.4249 11.4633 19.3909 11.3196 19.3252C11.1759 19.2595 11.0477 19.1636 10.9436 19.0439C10.7742 19.2388 10.5431 19.3682 10.2898 19.4101C10.0366 19.452 9.77674 19.4039 9.55469 19.2738V20.5478H17.3325V19.274C17.1104 19.404 16.8506 19.4522 16.5973 19.4103C16.344 19.3684 16.113 19.239 15.9436 19.0441V19.0439Z"
        fill="white"
      />
      <path
        d="M21.2218 22.5126C21.2218 22.5871 21.1925 22.6585 21.1404 22.7111C21.0883 22.7638 21.0177 22.7933 20.944 22.7933H6.77734V23.3548H21.7773V9.3186H21.2218V22.5126Z"
        fill="white"
      />
      <path
        d="M16.4991 16.8984H10.388C10.1671 16.8987 9.95527 16.9875 9.79904 17.1454C9.64281 17.3033 9.55494 17.5173 9.55469 17.7406V18.302C9.55469 18.4509 9.61322 18.5937 9.71741 18.699C9.82159 18.8043 9.9629 18.8635 10.1102 18.8635C10.2576 18.8635 10.3989 18.8043 10.5031 18.699C10.6073 18.5937 10.6658 18.4509 10.6658 18.302C10.6658 18.2276 10.6951 18.1562 10.7472 18.1035C10.7993 18.0509 10.8699 18.0213 10.9436 18.0213C11.0172 18.0213 11.0879 18.0509 11.14 18.1035C11.1921 18.1562 11.2214 18.2276 11.2214 18.302C11.2214 18.4509 11.2799 18.5937 11.3841 18.699C11.4883 18.8043 11.6296 18.8635 11.7769 18.8635C11.9243 18.8635 12.0656 18.8043 12.1697 18.699C12.2739 18.5937 12.3325 18.4509 12.3325 18.302C12.3325 18.2276 12.3617 18.1562 12.4138 18.1035C12.4659 18.0509 12.5366 18.0213 12.6102 18.0213C12.6839 18.0213 12.7546 18.0509 12.8067 18.1035C12.8588 18.1562 12.888 18.2276 12.888 18.302C12.888 18.4509 12.9466 18.5937 13.0507 18.699C13.1549 18.8043 13.2962 18.8635 13.4436 18.8635C13.5909 18.8635 13.7322 18.8043 13.8364 18.699C13.9406 18.5937 13.9991 18.4509 13.9991 18.302C13.9991 18.2276 14.0284 18.1562 14.0805 18.1035C14.1326 18.0509 14.2032 18.0213 14.2769 18.0213C14.3506 18.0213 14.4212 18.0509 14.4733 18.1035C14.5254 18.1562 14.5547 18.2276 14.5547 18.302C14.5547 18.4509 14.6132 18.5937 14.7174 18.699C14.8216 18.8043 14.9629 18.8635 15.1102 18.8635C15.2576 18.8635 15.3989 18.8043 15.5031 18.699C15.6073 18.5937 15.6658 18.4509 15.6658 18.302C15.6658 18.2276 15.6951 18.1562 15.7472 18.1035C15.7993 18.0509 15.8699 18.0213 15.9436 18.0213C16.0172 18.0213 16.0879 18.0509 16.14 18.1035C16.1921 18.1562 16.2214 18.2276 16.2214 18.302C16.2214 18.4509 16.2799 18.5937 16.3841 18.699C16.4883 18.8043 16.6296 18.8635 16.7769 18.8635C16.9243 18.8635 17.0656 18.8043 17.1697 18.699C17.2739 18.5937 17.3325 18.4509 17.3325 18.302V17.7406C17.3322 17.5173 17.2443 17.3033 17.0881 17.1454C16.9319 16.9875 16.7201 16.8987 16.4991 16.8984Z"
        fill="white"
      />
      <path
        d="M20.6651 12.1267H6.2207V22.2328H20.6651V12.1267ZM15.1096 13.5303C15.1645 13.5303 15.2182 13.5468 15.2639 13.5776C15.3096 13.6085 15.3452 13.6523 15.3662 13.7036C15.3872 13.7549 15.3928 13.8114 15.382 13.8658C15.3713 13.9203 15.3449 13.9703 15.306 14.0096C15.2672 14.0488 15.2177 14.0756 15.1638 14.0864C15.1099 14.0972 15.054 14.0917 15.0033 14.0704C14.9525 14.0492 14.9092 14.0132 14.8786 13.967C14.8481 13.9209 14.8318 13.8666 14.8318 13.8111C14.8318 13.7366 14.8611 13.6652 14.9132 13.6126C14.9653 13.5599 15.0359 13.5303 15.1096 13.5303ZM13.4429 13.2496C13.4979 13.2496 13.5516 13.2661 13.5973 13.2969C13.6429 13.3278 13.6785 13.3716 13.6996 13.4229C13.7206 13.4742 13.7261 13.5306 13.7154 13.5851C13.7046 13.6396 13.6782 13.6896 13.6393 13.7288C13.6005 13.7681 13.551 13.7948 13.4971 13.8057C13.4432 13.8165 13.3874 13.8109 13.3366 13.7897C13.2859 13.7684 13.2425 13.7325 13.212 13.6863C13.1814 13.6401 13.1651 13.5859 13.1651 13.5303C13.1651 13.4559 13.1944 13.3845 13.2465 13.3318C13.2986 13.2792 13.3693 13.2496 13.4429 13.2496ZM11.7763 13.5303C11.8312 13.5303 11.8849 13.5468 11.9306 13.5776C11.9763 13.6085 12.0119 13.6523 12.0329 13.7036C12.0539 13.7549 12.0594 13.8114 12.0487 13.8658C12.038 13.9203 12.0115 13.9703 11.9727 14.0096C11.9338 14.0488 11.8843 14.0756 11.8305 14.0864C11.7766 14.0972 11.7207 14.0917 11.67 14.0704C11.6192 14.0492 11.5758 14.0132 11.5453 13.967C11.5148 13.9209 11.4985 13.8666 11.4985 13.8111C11.4985 13.7366 11.5277 13.6652 11.5798 13.6126C11.6319 13.5599 11.7026 13.5303 11.7763 13.5303ZM18.4429 21.1099H8.44293C8.36925 21.1099 8.2986 21.0803 8.24651 21.0277C8.19441 20.975 8.16515 20.9036 8.16515 20.8292C8.16515 20.7547 8.19441 20.6833 8.24651 20.6307C8.2986 20.578 8.36925 20.5484 8.44293 20.5484H8.99848V17.7412C8.99889 17.3691 9.14536 17.0123 9.40573 16.7491C9.66611 16.486 10.0191 16.338 10.3874 16.3376H11.4985V14.934C11.4985 14.8595 11.5277 14.7881 11.5798 14.7354C11.6319 14.6828 11.7026 14.6532 11.7763 14.6532C11.8499 14.6532 11.9206 14.6828 11.9727 14.7354C12.0248 14.7881 12.054 14.8595 12.054 14.934V16.3376H13.1651V14.6532C13.1651 14.5788 13.1944 14.5074 13.2465 14.4547C13.2986 14.4021 13.3693 14.3725 13.4429 14.3725C13.5166 14.3725 13.5873 14.4021 13.6393 14.4547C13.6914 14.5074 13.7207 14.5788 13.7207 14.6532V16.3376H14.8318V14.934C14.8318 14.8595 14.8611 14.7881 14.9132 14.7354C14.9653 14.6828 15.0359 14.6532 15.1096 14.6532C15.1833 14.6532 15.2539 14.6828 15.306 14.7354C15.3581 14.7881 15.3874 14.8595 15.3874 14.934V16.3376H16.4985C16.8667 16.338 17.2197 16.486 17.4801 16.7491C17.7405 17.0123 17.887 17.3691 17.8874 17.7412V20.5484H18.4429C18.5166 20.5484 18.5873 20.578 18.6393 20.6307C18.6914 20.6833 18.7207 20.7547 18.7207 20.8292C18.7207 20.9036 18.6914 20.975 18.6393 21.0277C18.5873 21.0803 18.5166 21.1099 18.4429 21.1099Z"
        fill="white"
      />
      <path
        d="M17.8874 8.75783V7.91566C17.8874 7.8412 17.9166 7.7698 17.9687 7.71716C18.0208 7.66451 18.0915 7.63493 18.1651 7.63493C18.2388 7.63493 18.3095 7.66451 18.3616 7.71716C18.4137 7.7698 18.4429 7.8412 18.4429 7.91566V8.19638H18.9985V7.91566C18.9985 7.6923 18.9107 7.47809 18.7544 7.32015C18.5981 7.16221 18.3862 7.07349 18.1651 7.07349C17.9441 7.07349 17.7322 7.16221 17.5759 7.32015C17.4196 7.47809 17.3318 7.6923 17.3318 7.91566V8.75783H15.6651V7.91566C15.6651 7.8412 15.6944 7.7698 15.7465 7.71716C15.7986 7.66451 15.8693 7.63493 15.9429 7.63493C16.0166 7.63493 16.0873 7.66451 16.1393 7.71716C16.1914 7.7698 16.2207 7.8412 16.2207 7.91566V8.19638H16.7763V7.91566C16.7763 7.6923 16.6885 7.47809 16.5322 7.32015C16.3759 7.16221 16.1639 7.07349 15.9429 7.07349C15.7219 7.07349 15.51 7.16221 15.3537 7.32015C15.1974 7.47809 15.1096 7.6923 15.1096 7.91566V8.75783H10.6651V7.91566C10.6651 7.8412 10.6944 7.7698 10.7465 7.71716C10.7986 7.66451 10.8693 7.63493 10.9429 7.63493C11.0166 7.63493 11.0873 7.66451 11.1393 7.71716C11.1914 7.7698 11.2207 7.8412 11.2207 7.91566V8.19638H11.7763V7.91566C11.7763 7.6923 11.6885 7.47809 11.5322 7.32015C11.3759 7.16221 11.1639 7.07349 10.9429 7.07349C10.7219 7.07349 10.51 7.16221 10.3537 7.32015C10.1974 7.47809 10.1096 7.6923 10.1096 7.91566V8.75783H8.44293V7.91566C8.44293 7.8412 8.47219 7.7698 8.52428 7.71716C8.57638 7.66451 8.64703 7.63493 8.7207 7.63493C8.79437 7.63493 8.86503 7.66451 8.91712 7.71716C8.96922 7.7698 8.99848 7.8412 8.99848 7.91566V8.19638H9.55404V7.91566C9.55404 7.6923 9.46624 7.47809 9.30996 7.32015C9.15368 7.16221 8.94172 7.07349 8.7207 7.07349C8.49969 7.07349 8.28773 7.16221 8.13145 7.32015C7.97517 7.47809 7.88737 7.6923 7.88737 7.91566V8.75783H6.2207V11.5651H20.6651V8.75783H17.8874Z"
        fill="white"
      />
    </svg>
  ),
  trash: ({ fill = "var(--color-text)", ...props }) => (
    <svg
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.9">
        <path
          d="M1.92367 20.9391C1.9485 21.5321 2.43645 22 3.02985 22H13.3658C13.9592 22 14.4471 21.5321 14.4719 20.9391L15.2101 5.35718H1.18555L1.92367 20.9391ZM10.5359 9.22745C10.5359 8.97917 10.7372 8.77779 10.9856 8.77779H11.7049C11.9531 8.77779 12.1546 8.97911 12.1546 9.22745V18.1298C12.1546 18.3781 11.9533 18.5794 11.7049 18.5794H10.9856C10.7373 18.5794 10.5359 18.3782 10.5359 18.1298V9.22745ZM7.38851 9.22745C7.38851 8.97917 7.58983 8.77779 7.83817 8.77779H8.55744C8.80567 8.77779 9.0071 8.97911 9.0071 9.22745V18.1298C9.0071 18.3781 8.80584 18.5794 8.55744 18.5794H7.83817C7.58989 18.5794 7.38851 18.3782 7.38851 18.1298V9.22745ZM4.24101 9.22745C4.24101 8.97917 4.44233 8.77779 4.69067 8.77779H5.40999C5.65828 8.77779 5.85965 8.97911 5.85965 9.22745V18.1298C5.85965 18.3781 5.65833 18.5794 5.40999 18.5794H4.69067C4.44238 18.5794 4.24101 18.3782 4.24101 18.1298V9.22745Z"
          fill={fill}
        />
        <path
          d="M15.7023 1.13333H10.934V0.231858C10.934 0.103838 10.8302 0 10.7021 0H5.69492C5.5669 0 5.46312 0.103838 5.46312 0.231858V1.13328H0.694766C0.311029 1.13328 0 1.44436 0 1.8281V4.01079H16.3971V1.82815C16.3971 1.44441 16.086 1.13333 15.7023 1.13333Z"
          fill={fill}
        />
      </g>
    </svg>
  ),
  pencil: ({ fill = "var(--color-text)" }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.9636 1.03552C13.5864 -0.345172 11.3466 -0.345172 9.96928 1.03552L0.812414 10.189C0.740823 10.2606 0.696505 10.3526 0.682868 10.4515L0.00445533 15.4765C-0.0159993 15.6197 0.0351373 15.7629 0.134002 15.8617C0.219229 15.947 0.338548 15.9981 0.457867 15.9981C0.478322 15.9981 0.498776 15.9981 0.519231 15.9947L3.54652 15.5856C3.79879 15.5515 3.97607 15.3197 3.94198 15.0674C3.90789 14.8151 3.67607 14.6379 3.42379 14.672L0.996506 14.9992L1.47037 11.4947L5.15903 15.1833C5.24426 15.2686 5.36358 15.3197 5.48289 15.3197C5.60221 15.3197 5.72153 15.272 5.80676 15.1833L14.9636 6.02986C15.6318 5.36168 16 4.47531 16 3.53099C16 2.58666 15.6318 1.70029 14.9636 1.03552ZM10.1466 2.16052L11.6841 3.69803L3.32834 12.0538L1.79083 10.5163L10.1466 2.16052ZM5.4863 14.2083L3.98289 12.7049L12.3386 4.34917L13.842 5.85259L5.4863 14.2083ZM14.4829 5.19463L10.8045 1.5162C11.2716 1.13097 11.8545 0.919608 12.4682 0.919608C13.167 0.919608 13.8216 1.19234 14.3159 1.68325C14.8102 2.17416 15.0795 2.83212 15.0795 3.53099C15.0795 4.14804 14.8682 4.72758 14.4829 5.19463Z"
        fill={fill}
      />
    </svg>
  ),
  bird: ({ ...props }) => (
    <svg
      width="17"
      height="13"
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 6L6.5 12L16 1.5"
        stroke="#00ff00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cross: ({ ...props }) => (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.919239"
        y1="1"
        x2="16"
        y2="16.0808"
        stroke="#FD4343"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="16"
        y1="0.919239"
        x2="0.919239"
        y2="16"
        stroke="#FD4343"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  radioButton: ({ check = true }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6.5" stroke="#A16FE1" />
      {check && <circle cx="6.99947" cy="6.99947" r="4.45455" fill="#A16FE1" />}
    </svg>
  ),
  save: () => (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.675867 1.24995L0.673828 18.7487C0.67375 19.436 1.23606 19.9985 1.92339 19.9986L14.0759 20C14.7634 20.0001 15.326 19.4376 15.3261 18.75L15.3278 4.60497C15.3278 4.22119 15.1754 3.8531 14.9041 3.58171L11.7481 0.42495C11.4767 0.153558 11.1087 0.00105876 10.7249 0.00101954L1.92609 8.20026e-09C1.23853 -7.84176e-05 0.675946 0.562392 0.675867 1.24995Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M11.5644 8.04785H4.43624C3.99902 8.04785 3.64453 8.40273 3.64453 8.83995V16.352C3.64453 16.7892 3.99902 17.1437 4.43624 17.1437H11.5644C12.0016 17.1437 12.3561 16.7892 12.3561 16.352V8.83995C12.3561 8.40273 12.0016 8.04785 11.5644 8.04785ZM10.8939 10.7339H8.87424C8.71641 10.7339 8.58846 10.6059 8.58846 10.4481V9.50998C8.58846 9.35215 8.71641 9.2242 8.87424 9.2242H10.8939C11.0517 9.2242 11.1797 9.35215 11.1797 9.50998V10.4481C11.1797 10.6059 11.0517 10.7339 10.8939 10.7339ZM8.87424 11.9102H10.8939C11.0517 11.9102 11.1797 12.0382 11.1797 12.196V12.9955C11.1797 13.1534 11.0517 13.2813 10.8939 13.2813H8.87424C8.71641 13.2813 8.58846 13.1534 8.58846 12.9955V12.196C8.5885 12.0382 8.71645 11.9102 8.87424 11.9102ZM7.12632 13.2813H5.10666C4.94883 13.2813 4.82088 13.1533 4.82088 12.9955V12.196C4.82088 12.0382 4.94883 11.9102 5.10666 11.9102H7.12632C7.28416 11.9102 7.41211 12.0382 7.41211 12.196V12.9955C7.41211 13.1533 7.28416 13.2813 7.12632 13.2813ZM7.41211 9.51002V10.4481C7.41211 10.6059 7.28416 10.7339 7.12632 10.7339H5.10666C4.94883 10.7339 4.82088 10.6059 4.82088 10.4481V9.51002C4.82088 9.35219 4.94883 9.22424 5.10666 9.22424H7.12632C7.28416 9.22424 7.41211 9.35219 7.41211 9.51002ZM5.10666 14.4577H7.12632C7.28416 14.4577 7.41211 14.5856 7.41211 14.7435V15.6815C7.41211 15.8394 7.28416 15.9673 7.12632 15.9673H5.10666C4.94883 15.9673 4.82088 15.8394 4.82088 15.6815V14.7435C4.82092 14.5856 4.94887 14.4577 5.10666 14.4577ZM8.5885 15.6815V14.7434C8.5885 14.5856 8.71645 14.4576 8.87428 14.4576H10.8939C11.0518 14.4576 11.1797 14.5856 11.1797 14.7434V15.6815C11.1797 15.8393 11.0518 15.9673 10.8939 15.9673H8.87424C8.71645 15.9673 8.5885 15.8393 8.5885 15.6815Z"
        fill="#EBEFF0"
      />
      <path
        d="M11.7478 0.424346C11.5619 0.238477 11.3306 0.108447 11.0801 0.0449219V4.12001L15.328 8.36794V4.60389C15.328 4.22012 15.1756 3.85206 14.9042 3.58067L11.7478 0.424346Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M15.2838 4.25302C15.2884 4.27314 15.2927 4.29267 15.2966 4.31153H11.4675C11.1964 4.31153 10.9766 4.09174 10.9766 3.82058V0.0234375C11.0065 0.0287705 11.0379 0.0350053 11.0704 0.0421813C11.3558 0.105314 11.616 0.252088 11.8228 0.458779L14.8679 3.50386C15.0738 3.70977 15.2183 3.96932 15.2838 4.25302Z"
        fill="url(#paint2_linear)"
      />
      <path
        d="M15.3261 17.5366V18.749C15.3261 19.4366 14.7636 19.9992 14.076 19.9992H1.92354C1.23618 19.9992 0.673828 19.4368 0.673828 18.7494V17.5366H15.3261Z"
        fill="url(#paint3_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="4.16531"
          y1="7.7969"
          x2="13.6782"
          y2="17.3097"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#28A265" />
          <stop offset="1" stopColor="#28895E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="14.084"
          y1="6.81291"
          x2="12.5743"
          y2="2.40146"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#108372" stopOpacity="0" />
          <stop offset="1" stopColor="#108372" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="11.4619"
          y1="2.30355"
          x2="13.2155"
          y2="4.05723"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#91D1B2" />
          <stop offset="1" stopColor="#28A265" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="7.99998"
          y1="18.1836"
          x2="7.99998"
          y2="20.1281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#108372" stopOpacity="0" />
          <stop offset="1" stopColor="#108372" />
        </linearGradient>
      </defs>
    </svg>
  )
};
