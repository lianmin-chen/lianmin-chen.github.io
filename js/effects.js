// 磁性效果
document.querySelectorAll('a, button, .card').forEach(element => {
    element.classList.add('magnetic');
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// 点击波纹效果
document.addEventListener('click', (e) => {
    // 防止在短时间内生成太多波纹
    if (document.querySelectorAll('.ripple').length > 2) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    // 设置波纹的起始位置
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    
    document.body.appendChild(ripple);
    
    // 动画结束后移除波纹元素
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}); 