// Dữ liệu các cuộc hội thoại
const conversations = {
    'it-business': {
        title: 'Tìm hiểu về IT Business Analyst',
        messages: [
            {
                type: 'question',
                content: 'Chào anh/chị, em là sinh viên học tiếng Anh thường mai, hiện em đang tìm hiểu về nghề IT Business Analyst vì thấy nhiều anh chị báo đây là nghề phù hợp với sinh viên ngoại ngữ. Những kỹ năng nào quan trọng nhất để em có thể bắt đầu chuẩn bị từ bây giờ ạ?'
            },
            {
                type: 'answer',
                content: 'Em cũng có cùng câu hỏi với bạn a'
            },
            {
                type: 'answer',
                content: 'Chắc đây cũng là thắc mắc chung của nhiều bạn từ khối ngành ngoại ngữ muốn chuyển sang BA. Ngành này cần em hiểu về nghiệp vụ và truyền đạt giữa khách hàng và team kỹ thuật, không đòi hỏi phải là "dân IT gốc".'
            },
            {
                type: 'answer',
                content: 'Nếu em có nền tảng ngoại ngữ tốt => Hãy thử làm BA ở công ty outsource hoặc product có khách hàng nước ngoài để tận dụng thế mạnh này.'
            }
        ]
    },
    'interview': {
        title: 'Chia sẻ kinh nghiệm phỏng vấn',
        messages: [
            {
                type: 'question',
                content: 'Mình vừa qua vòng phỏng vấn đầu tiên cho vị trí Junior Developer. Các bạn có thể chia sẻ kinh nghiệm phỏng vấn không? Cần chuẩn bị những gì?'
            },
            {
                type: 'answer',
                content: 'Chúc mừng bạn! Mình cũng vừa phỏng vấn xong tuần trước. Theo kinh nghiệm của mình thì nên chuẩn bị kỹ về technical skills và soft skills.'
            },
            {
                type: 'answer',
                content: 'Đối với Junior thì họ thường hỏi về foundation knowledge nhiều hơn. Bạn nên ôn lại các concept cơ bản của ngôn ngữ mình apply.'
            }
        ]
    },
    'cv-review': {
        title: 'Review CV xin việc',
        messages: [
            {
                type: 'question',
                content: 'Mọi người có thể review CV của mình không? Mình đang apply vị trí Frontend Developer fresher. Cảm ơn mọi người!'
            },
            {
                type: 'answer',
                content: 'Bạn có thể share CV lên đây không? Mình có thể góp ý một chút.'
            },
            {
                type: 'answer',
                content: 'Với vị trí fresher thì nên focus vào projects và skills. Đừng quên highlight các project đã làm trong trường hoặc self-study.'
            }
        ]
    },
    'marketing': {
        title: 'Tìm hiểu về Marketing',
        messages: [
            {
                type: 'question',
                content: 'Các bạn có kinh nghiệm làm marketing không? Mình đang muốn chuyển sang làm Digital Marketing nhưng chưa biết bắt đầu từ đâu.'
            },
            {
                type: 'answer',
                content: 'Digital Marketing khá rộng bạn ạ. Bạn có thể bắt đầu từ việc học Google Ads, Facebook Ads, hoặc SEO.'
            },
            {
                type: 'answer',
                content: 'Mình khuyên bạn nên học qua các khóa học online trước, rồi thực hành với project cá nhân để có portfolio.'
            }
        ]
    },
    'job-sharing': {
        title: 'Chia sẻ cơ hội việc làm',
        messages: [
            {
                type: 'question',
                content: 'Công ty mình đang tuyển developer mới. Có ai quan tâm không? Yêu cầu ReactJS và NodeJS.'
            },
            {
                type: 'answer',
                content: 'Bạn có thể share thêm thông tin về công ty và mức lương không?'
            },
            {
                type: 'answer',
                content: 'Mình quan tâm! Có thể DM để nói chuyện thêm được không?'
            }
        ]
    }
};

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    setupEventListeners();
});

function initializeChat() {
    // Load cuộc hội thoại đầu tiên
    loadConversation('it-business');
}

function setupEventListeners() {
    // Lắng nghe click trên các cuộc hội thoại
    const conversationItems = document.querySelectorAll('.conversation-item');
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            const conversationId = this.dataset.conversation;
            selectConversation(this, conversationId);
        });
    });

    // Lắng nghe enter key trong input
    const chatInput = document.querySelector('.chat-input');
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Lắng nghe click trên nút gửi
    const sendBtn = document.querySelector('.send-btn');
    sendBtn.addEventListener('click', sendMessage);
}

function selectConversation(element, conversationId) {
    // Xóa class active khỏi tất cả items
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });

    // Thêm class active vào item được chọn
    element.classList.add('active');

    // Load cuộc hội thoại
    loadConversation(conversationId);
}

function loadConversation(conversationId) {
    const conversation = conversations[conversationId];
    if (!conversation) return;

    // Cập nhật tiêu đề
    document.getElementById('chat-title').textContent = conversation.title;

    // Cập nhật tin nhắn
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    conversation.messages.forEach((message, index) => {
        setTimeout(() => {
            addMessage(message.content, message.type);
        }, index * 300); // Delay để tạo hiệu ứng
    });
}

function addMessage(content, type = 'received') {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} new`;
    messageDiv.textContent = content;
    
    if (type === 'question') {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.style.cssText = 'display: flex; justify-content: flex-end; margin-left: 20px;';
        wrapperDiv.appendChild(messageDiv);
        chatMessages.appendChild(wrapperDiv);
    } else {
        chatMessages.appendChild(messageDiv);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Xóa class new sau animation
    setTimeout(() => {
        messageDiv.classList.remove('new');
    }, 300);
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        addMessage(message, 'sent');
        chatInput.value = '';
        
        // Simulate phản hồi tự động
        setTimeout(() => {
            const responses = [
                'Cảm ơn bạn đã chia sẻ!',
                'Ý kiến rất hay!',
                'Mình cũng nghĩ vậy.',
                'Bạn có thể chia sẻ thêm không?',
                'Thông tin bổ ích!'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'received');
        }, 1000);
    }
}

// Hàm tìm kiếm cuộc hội thoại
function searchConversations() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const conversationItems = document.querySelectorAll('.conversation-item');

    conversationItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const preview = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || preview.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Thêm event listener cho search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', searchConversations);
});

// Hàm toggle sidebar cho mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Responsive - thêm nút menu cho mobile
if (window.innerWidth <= 768) {
    const chatHeader = document.querySelector('.chat-header');
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'menu-btn';
    menuBtn.style.cssText = `
        background: none;
        border: none;
        color: #ffffff;
        font-size: 20px;
        cursor: pointer;
        margin-right: 15px;
    `;
    menuBtn.addEventListener('click', toggleSidebar);
    chatHeader.prepend(menuBtn);
}
