function isValidPriority(priority) {
                return ['low', 'medium', 'high'].includes(priority);
}

function isValidStatus(status) {
                return ['todo', 'in-progress', 'done'].includes(status);
}

module.exports = {
                isValidPriority,
                isValidStatus
};