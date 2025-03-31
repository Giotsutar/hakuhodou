FROM public.ecr.aws/lambda/python:3.9

# 安装系统依赖，防止 numpy fallback 到源码
RUN yum install -y gcc gcc-c++ python3-devel atlas-devel lapack-devel blas-devel

# 安装依赖（强制 binary）
COPY requirements.txt ./
RUN pip install --upgrade pip \
 && pip install --only-binary=:all: numpy \
 && pip install -r requirements.txt

# 拷贝函数
COPY app/lambda_function.py ${LAMBDA_TASK_ROOT}/lambda_function.py

# 为构建打时间戳，确保 digest 更新
RUN echo "Build time: $(date)" > /build-info.txt

CMD ["lambda_function.lambda_handler"]