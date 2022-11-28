const flow = [
    {
        name: "node1",
        alt: "signup and service registration",
        desc: "회원가입 후 매장을 등록하세요.",
    },
    {
        name: "node2",
        alt: "print QR code",
        desc: "QR 코드를 출력하세요.",
    },
    {
        name: "node3",
        alt: "attach QR code",
        desc: "출력한 QR 코드를 각 테이블에 부착하세요.",
    },
    {
        name: "node4",
        alt: "scan QR code and enter the site",
        desc: "손님들은 QR 코드를 스캔해 주문 페이지에 접속합니다.",
    },
    {
        name: "node5",
        alt: "pay on the sit",
        desc: "메뉴를 골라 그 자리에서 바로 결제하세요.",
    },
    {
        name: "node6",
        alt: "order list live check",
        desc: "주문 들어온 내역을 바로 확인할 수 있습니다.",
    },
];

export default flow;
