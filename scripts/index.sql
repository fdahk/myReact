-- 创建数据库
CREATE DATABASE IF NOT EXISTS graduation_design_system
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE graduation_design_system;

CREATE TABLE department (
    dept_id         INT             PRIMARY KEY AUTO_INCREMENT  COMMENT '系编号（主键，自增）',
    dept_name       VARCHAR(50)     NOT NULL UNIQUE             COMMENT '系名称（唯一）',
    dept_code       VARCHAR(10)     UNIQUE                      COMMENT '系代码',
    description     VARCHAR(200)                                COMMENT '系描述',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB COMMENT='系表';

CREATE TABLE major (
    major_id        INT             PRIMARY KEY AUTO_INCREMENT  COMMENT '专业编号（主键，自增）',
    major_name      VARCHAR(50)     NOT NULL                    COMMENT '专业名称',
    major_code      VARCHAR(10)                                 COMMENT '专业代码',
    dept_id         INT             NOT NULL                    COMMENT '所属系编号（外键）',
    description     VARCHAR(200)                                COMMENT '专业描述',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 外键约束
    CONSTRAINT fk_major_dept 
        FOREIGN KEY (dept_id) REFERENCES department(dept_id)
        ON DELETE RESTRICT      -- 禁止删除有专业的系
        ON UPDATE CASCADE,      -- 系编号更新时级联更新
    
    -- 唯一约束：同一个系内专业名称不能重复
    CONSTRAINT uk_dept_major UNIQUE (dept_id, major_name)
) ENGINE=InnoDB COMMENT='专业表';

-- 创建索引
CREATE INDEX idx_major_dept ON major(dept_id);

CREATE TABLE teacher (
    teacher_no      VARCHAR(20)     PRIMARY KEY                 COMMENT '工号（主键）',
    name            VARCHAR(50)     NOT NULL                    COMMENT '姓名',
    gender          ENUM('男', '女') NOT NULL                   COMMENT '性别',
    title           VARCHAR(30)                                 COMMENT '职称（教授/副教授/讲师等）',
    dept_id         INT             NOT NULL                    COMMENT '所在系编号（外键）',
    phone           VARCHAR(20)                                 COMMENT '联系电话',
    email           VARCHAR(100)                                COMMENT '电子邮箱',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 外键约束
    CONSTRAINT fk_teacher_dept 
        FOREIGN KEY (dept_id) REFERENCES department(dept_id)
        ON DELETE RESTRICT      -- 禁止删除有老师的系
        ON UPDATE CASCADE
) ENGINE=InnoDB COMMENT='老师表';

-- 创建索引
CREATE INDEX idx_teacher_dept ON teacher(dept_id);
CREATE INDEX idx_teacher_name ON teacher(name);

CREATE TABLE student (
    student_no      VARCHAR(20)     PRIMARY KEY                 COMMENT '学号（主键）',
    name            VARCHAR(50)     NOT NULL                    COMMENT '姓名',
    gender          ENUM('男', '女') NOT NULL                   COMMENT '性别',
    major_id        INT             NOT NULL                    COMMENT '所属专业编号（外键）',
    class_name      VARCHAR(50)                                 COMMENT '班级',
    phone           VARCHAR(20)                                 COMMENT '联系电话',
    email           VARCHAR(100)                                COMMENT '电子邮箱',
    enrollment_year YEAR                                        COMMENT '入学年份',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 外键约束
    CONSTRAINT fk_student_major 
        FOREIGN KEY (major_id) REFERENCES major(major_id)
        ON DELETE RESTRICT      -- 禁止删除有学生的专业
        ON UPDATE CASCADE
) ENGINE=InnoDB COMMENT='学生表';

-- 创建索引
CREATE INDEX idx_student_major ON student(major_id);
CREATE INDEX idx_student_name ON student(name);

CREATE TABLE topic (
    topic_no        INT             PRIMARY KEY AUTO_INCREMENT  COMMENT '题号（主键，自增）',
    title           VARCHAR(200)    NOT NULL                    COMMENT '题目名称',
    type            VARCHAR(50)                                 COMMENT '课题类型（理论研究/应用开发/综合等）',
    description     TEXT                                        COMMENT '课题描述/要求',
    teacher_no      VARCHAR(20)     NOT NULL                    COMMENT '指导老师工号（外键）',
    status          ENUM('待选', '已选', '进行中', '已完成') 
                                    DEFAULT '待选'              COMMENT '课题状态',
    max_students    INT             DEFAULT 1                   COMMENT '最大学生数（本题目为1）',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 外键约束
    CONSTRAINT fk_topic_teacher 
        FOREIGN KEY (teacher_no) REFERENCES teacher(teacher_no)
        ON DELETE RESTRICT      -- 禁止删除有课题的老师
        ON UPDATE CASCADE
) ENGINE=InnoDB COMMENT='毕业设计课题表';

-- 创建索引
CREATE INDEX idx_topic_teacher ON topic(teacher_no);
CREATE INDEX idx_topic_title ON topic(title);
CREATE INDEX idx_topic_status ON topic(status);

CREATE TABLE selection (
    selection_id    INT             PRIMARY KEY AUTO_INCREMENT  COMMENT '选题记录编号（主键）',
    student_no      VARCHAR(20)     NOT NULL UNIQUE             COMMENT '学生学号（外键，唯一）',
    topic_no        INT             NOT NULL UNIQUE             COMMENT '课题题号（外键，唯一）',
    select_date     DATE            NOT NULL                    COMMENT '选题日期',
    grade           ENUM('优秀', '良好', '中等', '及格', '不及格') 
                                    DEFAULT NULL                COMMENT '成绩评定',
    grade_date      DATE                                        COMMENT '评分日期',
    comments        TEXT                                        COMMENT '指导老师评语',
    created_at      DATETIME        DEFAULT CURRENT_TIMESTAMP   COMMENT '创建时间',
    updated_at      DATETIME        DEFAULT CURRENT_TIMESTAMP 
                                    ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    -- 外键约束
    CONSTRAINT fk_selection_student 
        FOREIGN KEY (student_no) REFERENCES student(student_no)
        ON DELETE RESTRICT      -- 禁止删除有选题记录的学生
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_selection_topic 
        FOREIGN KEY (topic_no) REFERENCES topic(topic_no)
        ON DELETE RESTRICT      -- 禁止删除被选中的课题
        ON UPDATE CASCADE
) ENGINE=InnoDB COMMENT='选题表';

-- 视图1：学生选题详情视图
CREATE VIEW v_student_selection AS
SELECT 
    s.student_no                AS '学号',
    s.name                      AS '学生姓名',
    s.gender                    AS '学生性别',
    m.major_name                AS '专业',
    d.dept_name                 AS '系别',
    t.topic_no                  AS '题号',
    t.title                     AS '课题名称',
    t.type                      AS '课题类型',
    te.teacher_no               AS '指导老师工号',
    te.name                     AS '指导老师姓名',
    te.title                    AS '老师职称',
    sel.select_date             AS '选题日期',
    sel.grade                   AS '成绩',
    sel.comments                AS '评语'
FROM student s
LEFT JOIN selection sel ON s.student_no = sel.student_no
LEFT JOIN topic t ON sel.topic_no = t.topic_no
LEFT JOIN teacher te ON t.teacher_no = te.teacher_no
LEFT JOIN major m ON s.major_id = m.major_id
LEFT JOIN department d ON m.dept_id = d.dept_id;

-- 视图2：老师指导情况统计视图
CREATE VIEW v_teacher_guidance AS
SELECT 
    te.teacher_no               AS '工号',
    te.name                     AS '姓名',
    te.title                    AS '职称',
    d.dept_name                 AS '所在系',
    COUNT(DISTINCT t.topic_no)  AS '申报课题数',
    COUNT(sel.selection_id)     AS '指导学生数'
FROM teacher te
LEFT JOIN department d ON te.dept_id = d.dept_id
LEFT JOIN topic t ON te.teacher_no = t.teacher_no
LEFT JOIN selection sel ON t.topic_no = sel.topic_no
GROUP BY te.teacher_no, te.name, te.title, d.dept_name;

-- 视图3：课题选择情况视图
CREATE VIEW v_topic_status AS
SELECT 
    t.topic_no                  AS '题号',
    t.title                     AS '题目',
    t.type                      AS '类型',
    te.name                     AS '指导老师',
    t.status                    AS '状态',
    s.student_no                AS '选题学生学号',
    s.name                      AS '选题学生姓名',
    sel.grade                   AS '成绩'
FROM topic t
LEFT JOIN teacher te ON t.teacher_no = te.teacher_no
LEFT JOIN selection sel ON t.topic_no = sel.topic_no
LEFT JOIN student s ON sel.student_no = s.student_no;

-- ============================================
-- 触发器：维护数据一致性
-- ============================================

-- 触发器1：学生选题后自动更新课题状态为"已选"
DELIMITER //
CREATE TRIGGER trg_after_selection_insert
AFTER INSERT ON selection
FOR EACH ROW
BEGIN
    UPDATE topic SET status = '已选' WHERE topic_no = NEW.topic_no;
END//
DELIMITER ;

-- 触发器2：取消选题后自动更新课题状态为"待选"
DELIMITER //
CREATE TRIGGER trg_after_selection_delete
AFTER DELETE ON selection
FOR EACH ROW
BEGIN
    UPDATE topic SET status = '待选' WHERE topic_no = OLD.topic_no;
END//
DELIMITER ;

-- 触发器3：评分后自动更新课题状态为"已完成"
DELIMITER //
CREATE TRIGGER trg_after_grade_update
AFTER UPDATE ON selection
FOR EACH ROW
BEGIN
    IF NEW.grade IS NOT NULL AND OLD.grade IS NULL THEN
        UPDATE topic SET status = '已完成' WHERE topic_no = NEW.topic_no;
    END IF;
END//
DELIMITER ;
    
-- 插入系数据
INSERT INTO department (dept_name, dept_code, description) VALUES
('计算机科学与技术系', 'CS', '负责计算机相关专业教学'),
('电子信息工程系', 'EE', '负责电子信息相关专业教学'),
('数学与统计系', 'MATH', '负责数学统计相关专业教学');

-- 插入专业数据
INSERT INTO major (major_name, major_code, dept_id) VALUES
('软件工程', 'SE', 1),
('计算机科学与技术', 'CS', 1),
('人工智能', 'AI', 1),
('电子信息工程', 'EE', 2),
('通信工程', 'CE', 2),
('应用数学', 'AM', 3);

-- 插入老师数据
INSERT INTO teacher (teacher_no, name, gender, title, dept_id, phone, email) VALUES
('T001', '张明', '男', '教授', 1, '13800138001', 'zhangming@edu.cn'),
('T002', '李华', '女', '副教授', 1, '13800138002', 'lihua@edu.cn'),
('T003', '王强', '男', '讲师', 1, '13800138003', 'wangqiang@edu.cn'),
('T004', '刘芳', '女', '教授', 2, '13800138004', 'liufang@edu.cn'),
('T005', '陈伟', '男', '副教授', 3, '13800138005', 'chenwei@edu.cn');

-- 插入学生数据
INSERT INTO student (student_no, name, gender, major_id, class_name, phone, enrollment_year) VALUES
('S2021001', '赵一', '男', 1, '软件2101班', '15900159001', 2021),
('S2021002', '钱二', '女', 1, '软件2101班', '15900159002', 2021),
('S2021003', '孙三', '男', 2, '计科2101班', '15900159003', 2021),
('S2021004', '李四', '女', 2, '计科2101班', '15900159004', 2021),
('S2021005', '周五', '男', 3, 'AI2101班', '15900159005', 2021),
('S2021006', '吴六', '女', 4, '电信2101班', '15900159006', 2021);

-- 插入课题数据
INSERT INTO topic (title, type, description, teacher_no) VALUES
('基于深度学习的图像识别系统', '应用开发', '使用CNN实现图像分类功能', 'T001'),
('校园二手交易平台设计与实现', '应用开发', '基于Web的校园二手交易系统', 'T001'),
('智能推荐算法研究', '理论研究', '研究协同过滤推荐算法', 'T002'),
('基于Vue的在线考试系统', '应用开发', '前后端分离的在线考试平台', 'T002'),
('物联网智能家居控制系统', '综合设计', 'Arduino+手机APP控制家居设备', 'T003'),
('基于深度学习的图像识别系统', '应用开发', '使用PyTorch实现目标检测', 'T004'),
('数据挖掘算法优化研究', '理论研究', '研究聚类算法的优化方法', 'T005');

-- 插入选题数据
INSERT INTO selection (student_no, topic_no, select_date, grade, comments) VALUES
('S2021001', 1, '2024-12-01', '优秀', '完成度高，创新性强'),
('S2021002', 3, '2024-12-02', '良好', '论文写作规范，有一定深度'),
('S2021003', 5, '2024-12-03', NULL, NULL),
('S2021004', 2, '2024-12-04', NULL, NULL);