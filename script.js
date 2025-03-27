document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后添加动画
    const mainTitle = document.querySelector('header h1');
    mainTitle.style.opacity = '0';
    mainTitle.style.transform = 'translateY(-20px)';
    mainTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(0)';
    }, 300);
    
    // 合约地址样式适配
    const contractAddress = document.getElementById('contract-address');
    if (contractAddress) {
        const addressSpan = contractAddress.querySelector('.address-text');
        const caLabel = contractAddress.querySelector('.ca-label');
        
        // 检测设备并适配样式的函数
        const adaptToScreenSize = () => {
            const isMobile = window.innerWidth <= 768;
            const isVerySmall = window.innerWidth <= 375;
            
            if (addressSpan) {
                if (isMobile) {
                    // 在小屏幕上，确保地址可见
                    addressSpan.style.display = 'block';
                    addressSpan.style.wordBreak = 'break-all';
                    addressSpan.style.fontWeight = 'bold';
                    addressSpan.style.textAlign = 'center';
                    
                    if (caLabel) {
                        caLabel.style.display = 'block';
                        caLabel.style.fontWeight = 'bold';
                        caLabel.style.textAlign = 'center';
                    }
                    
                    // 设置父容器也居中
                    const tokenAddress = document.querySelector('.token-address');
                    if (tokenAddress) {
                        tokenAddress.style.textAlign = 'center';
                    }
                    
                    if (isVerySmall) {
                        // 极小屏幕的特殊处理
                        addressSpan.style.fontSize = '0.75rem';
                        addressSpan.style.lineHeight = '1.4';
                        
                        if (caLabel) {
                            caLabel.style.fontSize = '0.85rem';
                        }
                    }
                } else {
                    // 在大屏幕上恢复默认样式
                    addressSpan.style.display = 'inline';
                    addressSpan.style.wordBreak = 'normal';
                    addressSpan.style.fontSize = '';
                    addressSpan.style.lineHeight = '';
                    addressSpan.style.fontWeight = '';
                    addressSpan.style.textAlign = '';
                    
                    if (caLabel) {
                        caLabel.style.display = 'inline';
                        caLabel.style.marginRight = '5px';
                        caLabel.style.fontWeight = '';
                        caLabel.style.textAlign = '';
                    }
                }
            }
        };
        
        // 初始调用
        adaptToScreenSize();
        
        // 窗口大小变化时重新调整
        window.addEventListener('resize', adaptToScreenSize);
    }
    
    // 滚动相关元素
    const galleryItems = document.querySelectorAll('.gallery-item');
    const infoSection = document.querySelector('.info');
    const features = document.querySelectorAll('.feature');
    const tokenSection = document.querySelector('.token-info');
    
    // 检测元素是否在视窗内
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= 0
        );
    }
    
    // 为进入视窗的元素添加可见类
    function handleScrollAnimation() {
        // 处理画廊项目
        galleryItems.forEach((item, index) => {
            if (isInViewport(item, 50)) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
        
        // 处理信息部分
        if (isInViewport(infoSection, 100)) {
            infoSection.classList.add('visible');
            
            // 处理特性部分
            setTimeout(() => {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.classList.add('visible');
                    }, index * 150);
                });
            }, 300);
        }
        
        // 处理代币信息部分
        if (isInViewport(tokenSection, 100)) {
            tokenSection.classList.add('visible');
        }
    }
    
    // 初始检查
    setTimeout(handleScrollAnimation, 300);
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加视差滚动效果
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // 为主要标题添加视差效果
        mainTitle.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        
        // 为龙猫图片添加视差效果
        const totoroImage = document.querySelector('.main-totoro');
        if (totoroImage) {
            totoroImage.style.transform = `translateY(${scrollPosition * -0.03}px) translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }
    });
    
    // 添加元素进入动画
    const applyEntranceAnimation = (elements, delay = 0, stagger = 100) => {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay + (index * stagger));
        });
    };
    
    // 应用入场动画到社交链接
    const socialLinks = document.querySelectorAll('.social-link');
    applyEntranceAnimation(socialLinks, 1000, 150);
}); 